/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies, headers } from "next/headers";
import AxiosCommon, { AxiosOptions } from "../Axios";
import {
  CORE_CHECK_REFRESH_TOKEN_ENDPOINT,
  CORE_LOGOUT_ENDPOINT,
} from "@/app/routes/coreApi";

const API_NOT_TOKEN = process.env.API_NOT_TOKEN?.split(",") || [
  "auth/login",
  "auth/register",
  "auth/verify-account",
  "auth/logout",
];

class ServerService extends AxiosCommon {
  constructor(options: AxiosOptions) {
    super(options);

    this.setupRequestInterceptor();
    // Trong class ServerService
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        console.log("Response Interceptor server: ", response.data);
        const pagination = {
          page: response.data?.page || 1,
          limit: response.data?.limit || 10,
          total: response.data?.total || 0,
          totalPage: response.data?.totalPage || 1,
        }
        const data = {
          ...response.data.data,
          pagination: pagination || null,
          code: response.data.code || response.status,
        };
        return data;
      },
      async (error: any) => {
        console.log("Response Interceptor Error server:", error);

        const originalRequest = error.config;
        const isApiNotToken = API_NOT_TOKEN.some((api) =>
          originalRequest?.url?.includes(api)
        );

        // ✅ Chỉ refresh token nếu không thuộc API_NOT_TOKEN
        if (error.response?.status === 401 && !isApiNotToken) {
          try {
            console.warn("⚠️ Access token expired, trying refresh...");

            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const endpoint = `${baseUrl}/${CORE_CHECK_REFRESH_TOKEN_ENDPOINT}`;

            const refreshRes = await this.axiosInstance.post(
              endpoint,
              {},
              { withCredentials: true }
            );

            if (refreshRes?.data?.accessToken) {
              const cookieStore = await cookies();
              cookieStore.set("token", refreshRes.data.accessToken, {
                httpOnly: true,
                path: "/",
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
              });

              // Retry lại request ban đầu
              originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
              return this.axiosInstance.request(originalRequest);
            }
          } catch (refreshErr: any) {
            console.error(
              "❌ Refresh token failed:",
              refreshErr.response?.data
            );

            try {
              const baseUrl = process.env.NEXT_PUBLIC_API_URL;
              const endpoint = `${baseUrl}/${CORE_LOGOUT_ENDPOINT}`;
              await this.axiosInstance.post(
                endpoint,
                {},
                { withCredentials: true }
              );
            } catch (e) {
              console.warn("Logout API failed (có thể đã hết session)");
            }

            const cookieStore = await cookies();
            cookieStore.delete("token");

            return Promise.resolve({
              code: 401,
              message: "Session expired, please login again",
            });
          }
        }

        // ❌ Các lỗi khác (bao gồm login thất bại)
        if (error.response) {
          return Promise.resolve({
            data: error.response.data.error,
            code: error.response.status || error.response.data?.code || 500,
            message: error.response.data?.message || "Request failed",
          });
        }

        return Promise.reject(error);
      }
    );
  }

  private setupRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          await this.addAuthHeader(config);
          await this.addCommonHeaders(config);
          return config;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      (error) => {
        // Xử lý lỗi request
        console.error("Request Interceptor Error:", error);
        return Promise.reject(error);
      }
    );
  }

  private async addAuthHeader(config: any) {
    const isMatchApiNotToken = API_NOT_TOKEN.some((api) =>
      config.url?.includes(api)
    );

    if (!isMatchApiNotToken) {
      const cookieStorage = await cookies();
      const token = cookieStorage.get("token")?.value || "";

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found for authenticated API:", config.url);
      }
    }
  }

  private async addCommonHeaders(config: any) {
    const headerLst = await headers();

    config.headers["User-Agent"] = headerLst.get("user-agent") || "";
    config.headers["Content-Type"] = "application/json";
    config.headers["address-ip"] = headerLst.get("cf-connecting-ip") || "";
    config.headers["x-forwarded-for"] =
      headerLst.get("x-forwarded-for") ||
      headerLst.get("connection.remoteAddress") ||
      "";
  }

  private logRequest(config: any) {
    console.log("🌐 API Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });
  }
}

export default ServerService;
