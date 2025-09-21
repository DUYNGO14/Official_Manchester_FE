import { post } from "@/app/common/ajax/server";
import { cookiesOption } from "@/app/common/utils/cookiesOption.utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const tokenName = process.env.COOKIE_TOKEN_NAME || "access_token";
  const refreshName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh_token";

  try {
    // Gọi logout BE để xoá session bên server
    try {
      await post("/auth/logout", {});
    } catch (err) {
      console.error("Backend logout error:", err);
    }

    // Xoá cookies trong Next.js
    cookieStore.set(tokenName, "", cookiesOption(0));
    cookieStore.set(refreshName, "", cookiesOption(0));

    // Response trả về FE
    const response = NextResponse.json(
      {
        code: 200,
        message: "Đăng xuất thành công",
        data: null,
      },
      { status: 200 }
    );

    // Đảm bảo xoá cookie từ response header
    response.cookies.delete(tokenName);
    response.cookies.delete(refreshName);

    return response;
  } catch (error) {

    const errorResponse = NextResponse.json(
      {
        code: 500,
        message: "Đã xóa session local (có lỗi BE)",
        data: null,
      },
      { status: 500 }
    );

    errorResponse.cookies.delete(tokenName);
    errorResponse.cookies.delete(refreshName);

    return errorResponse;
  }
}
