/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "@/app/common/ajax/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res: any = await post("/auth/register", body);
    // ✅ SỬA: Kiểm tra code thay vì data
    if (res?.code >= 400) {
      // Trả về error response từ API
      return Response.json(
        {
          message: res.message || "Authentication failed",
          errors: res.message || [],
          code: res.code,
        },
        { status: res.code }
      );
    }
    return Response.json(res || {}, { status: 200 });
  } catch (error: any) {

    // ✅ Xử lý lỗi khác (network error, etc.)
    return Response.json(
      {
        message: "Internal server error",
        code: 500,
      },
      { status: 500 }
    );
  }
}
