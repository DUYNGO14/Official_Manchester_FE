//api/auth/refresh-token
/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "@/app/common/ajax/server";

export async function GET(request: Request) {
  try {
    const res : any =  await get("/auth/refresh-token");
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
  } catch (error : any) {
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