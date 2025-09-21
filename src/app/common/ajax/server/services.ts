/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookiesOption } from "@/app/common/utils/cookiesOption.utils";
import { API_NOT_TOKEN } from "@/app/routes/apiNotToken";
import { CORE_CHECK_REFRESH_TOKEN_ENDPOINT } from "@/app/routes/coreApi";
import { NEXT_LOGOUT_ENDPOINT } from "@/app/routes/nextApi";
import axios from "axios";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import AxiosCommon, { AxiosOptions } from "../Axios";

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}
class ServerService extends AxiosCommon {
  constructor(options: AxiosOptions) {
    super(options);

    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const isMatchApiNotToken = API_NOT_TOKEN.some((api) =>
          config.url?.includes(api)
        );

        if (!isMatchApiNotToken) {
          const uCookies = await cookies();
          let token = uCookies.get(
            process.env.COOKIE_TOKEN_NAME! || "access_token"
          )?.value;
          const refreshToken = uCookies.get(
            process.env.COOKIE_REFRESH_TOKEN_NAME! || "refresh_token"
          )?.value;

          console.log("===========================================");
          console.log("token", token);
          console.log("refreshToken", refreshToken);
          console.log("===========================================");
          if (!token && refreshToken) {
            token = (await refreshTokenHandler()) as string;
          }

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        const headerLst = await headers();
        config.withCredentials = true; // để gửi cookie refreshToken
        config.headers["User-Agent"] = headerLst.get("User-Agent");
        config.headers["Content-Type"] = "application/json";
        config.headers["address-ip"] = headerLst.get("cf-connecting-ip");
        config.headers["x-forwarded-for"] =
          headerLst.get("x-forwarded-for") ||
          headerLst.get("connection.remoteAddress");

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private setupResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        const data = {
          ...response.data,
          code: response.data.code || response.status,
        };
        return data;
      },
      async (error: any) => {
        const status = error?.response?.status || error?.status;
        const originalRequest = error.config;

        // lấy path
        const urlPath = new URL(
          originalRequest.url,
          process.env.CORE_API_DOMAIN
        ).pathname;

        const isApiNotToken = API_NOT_TOKEN.some((api) => urlPath === api);

        // nếu API nằm trong API_NOT_TOKEN thì không auto logout
        if (status === 401 && !originalRequest._retry && !isApiNotToken) {
          originalRequest._retry = true;

          const uCookies = await cookies();
          const refreshToken = uCookies.get(
            process.env.COOKIE_REFRESH_TOKEN_NAME!
          )?.value;

          if (refreshToken) {
            try {
              const newToken = await refreshTokenHandler();
              console.log("newToken", newToken);
              if (newToken) {
                originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${newToken}`,
                };
                return this.axiosInstance(originalRequest); // retry request
              }
            } catch (e) {
              // refresh fail → logout
              await clearAuthCookies();
              await logoutAction();
              return Promise.reject(e);
            }
          }
          // refresh token không tồn tại → logout
          await clearAuthCookies();
          await logoutAction();
        }

        return Promise.reject({
          code: status || error.code || 500,
          message: error.message,
          data: error?.response?.data,
        });
      }
    );
  }
}

async function clearAuthCookies() {
  const uCookies = await cookies();
  uCookies.set(process.env.COOKIE_TOKEN_NAME!, "", cookiesOption(0));
  uCookies.set(process.env.COOKIE_REFRESH_TOKEN_NAME!, "", cookiesOption(0));
}

// Quản lý refresh token 1 lần duy nhất
async function refreshTokenHandler(): Promise<string | null> {
  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh((token) => resolve(token));
    });
  }

  isRefreshing = true;
  try {
    const newToken = await refreshTokenAction();
    onRefreshed(newToken);
    return newToken;
  } catch {
    onRefreshed(null);
    return null;
  } finally {
    isRefreshing = false;
  }
}

async function refreshTokenAction(): Promise<string | null> {
  try {
    const useCookies = await cookies();
    const headerLst = await headers();

    // Chỉ lấy refresh token cookie
    const refreshTokenCookie = useCookies.get(
      process.env.COOKIE_REFRESH_TOKEN_NAME! || "refresh_token"
    );

    if (!refreshTokenCookie) {
      console.error("Refresh token cookie not found");
      return null;
    }

    const cookieHeader = `${refreshTokenCookie.name}=${refreshTokenCookie.value}`;

    const endpoint = `${process.env.CORE_API_DOMAIN}/${CORE_CHECK_REFRESH_TOKEN_ENDPOINT}`;
    // Trong refreshTokenAction
    console.log("Refresh token cookie details:", {
      name: process.env.COOKIE_REFRESH_TOKEN_NAME,
      value: refreshTokenCookie?.value ? "exists" : "missing",
      length: refreshTokenCookie?.value?.length,
    });

    console.log("Endpoint:", endpoint);
    const respToken = await axios.post(
      endpoint,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": headerLst.get("User-Agent"),
          "address-ip": headerLst.get("cf-connecting-ip"),
          "x-forwarded-for": headerLst.get("x-forwarded-for"),
          Cookie: cookieHeader,
        },
      }
    );
    console.log("Refresh token response status:", respToken.status);
    console.log("Refresh token response data:", respToken.data);
    console.log("===============Refresh token===============", respToken);

    if (respToken?.data?.data?.accessToken) {
      // update cookie
      const tokenDecoded = jwt.decode(
        String(respToken?.data?.data?.accessToken)
      );

      const tokenIat =
        typeof tokenDecoded === "object" && tokenDecoded !== null
          ? (tokenDecoded as jwt.JwtPayload).iat
          : undefined;
      const tokenExp =
        typeof tokenDecoded === "object" && tokenDecoded !== null
          ? (tokenDecoded as jwt.JwtPayload).exp
          : undefined;
      useCookies.set(
        process.env.COOKIE_TOKEN_NAME!,
        String(respToken?.data?.data?.accessToken),
        cookiesOption(
          tokenExp && tokenIat ? (tokenExp - tokenIat) * 1000 : undefined
        ) as any
      );

      const refreshTokenDecoded = jwt.decode(
        String(respToken?.data?.data?.refreshToken)
      );
      const refreshIat =
        typeof refreshTokenDecoded === "object" && refreshTokenDecoded !== null
          ? (refreshTokenDecoded as jwt.JwtPayload).iat
          : undefined;
      const refreshExp =
        typeof refreshTokenDecoded === "object" && refreshTokenDecoded !== null
          ? (refreshTokenDecoded as jwt.JwtPayload).exp
          : undefined;

      useCookies.set(
        process.env.COOKIE_REFRESH_TOKEN_NAME!,
        String(respToken?.data?.data?.refreshToken),
        cookiesOption(
          refreshExp && refreshIat
            ? (refreshExp - refreshIat) * 1000
            : undefined
        )
      );
      // await checkRefreshToken(respToken.data); // cập nhật lại cookie/token trong hệ thống
      return respToken.data.data.accessToken;
    }
    return null;
  } catch (error :any) {
    console.error("Refresh token error details:", {
      status: error.response?.status,
      data: error.response?.data, // ← QUAN TRỌNG: xem server trả về gì
      message: error.message,
      headers: error.response?.headers
    });
    return null;
  }
}
async function logoutAction() {
  try {
    const headerLst = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const endpoint = `${baseUrl}/api${NEXT_LOGOUT_ENDPOINT}`;
    await axios.post(
      endpoint,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": headerLst.get("User-Agent"),
          "address-ip": headerLst.get("cf-connecting-ip"),
          "x-forwarded-for":
            headerLst.get("x-forwarded-for") ||
            headerLst.get("connection.remoteAddress"),
        },
      }
    );
  } catch (error) {
    console.error("logout error:", error);
  }
}

export default ServerService;
