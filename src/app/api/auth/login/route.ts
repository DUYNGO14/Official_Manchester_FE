/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "@/app/common/ajax/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { cookiesOption } from "@/app/common/utils/cookiesOption.utils";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Gọi API login phía backend
    const res: any = await post("/auth/login", body);
    console.log("res api login", res);

    if (!res || res?.code >= 400) {
      const message = res?.message || "Authentication failed";
      const code = res?.code || 500;
      const errors = res?.data || [];
      return Response.json(
        {
          message: message,
          errors: errors,
          code: code,
        },
        { status: code }
      );
    }

    // Lấy cookies store của Next.js
    const cookieStore = await cookies();

    // --- Xử lý accessToken ---
    const accessToken = res?.data?.accessToken;
    if (accessToken) {
      const tokenDecoded = jwt.decode(accessToken) as jwt.JwtPayload | null;
      const iat = tokenDecoded?.iat;
      const exp = tokenDecoded?.exp;

      // maxAge tính bằng milliseconds
      const maxAge = iat && exp ? (exp - iat) * 1000 : undefined;

      cookieStore.set(
        process.env.COOKIE_TOKEN_NAME || "access_token",
        accessToken,
        cookiesOption(maxAge) as any
      );
    }

    // --- Xử lý refreshToken ---
    const refreshToken = res?.data?.refreshToken;
    if (refreshToken) {
      const refreshDecoded = jwt.decode(refreshToken) as jwt.JwtPayload | null;
      const iat = refreshDecoded?.iat;
      const exp = refreshDecoded?.exp;

      const maxAge = iat && exp ? (exp - iat) * 1000 : undefined;

      cookieStore.set(
        process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh_token",
        refreshToken,
        cookiesOption(maxAge) as any
      );
    }
    return Response.json(res);
  } catch (error: any) {
    console.error("Error login route:", error);

    return Response.json(
      {
        message: "Internal server error",
        code: 500,
      },
      { status: 500 }
    );
  }
}
