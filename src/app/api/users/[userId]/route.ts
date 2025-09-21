/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "@/app/common/ajax/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }
    const response: any = await get(`/users/${userId}`);

    if (response?.code >= 400) {
      return NextResponse.json(
        {
          message: response.data?.message || "Authentication failed",
          errors: response.data?.errors || [],
          code: response.code,
        },
        { status: response.code }
      );
    }

    return NextResponse.json(
      {
        code: 200,
        message: response.data?.message || "Get profile successfully",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get user info error:", error);

    // ✅ Xử lý lỗi chi tiết hơn
    if (error.response?.status === 401) {
      return NextResponse.json(
        {
          code: 401,
          message: "Unauthorized - Please login again",
          data: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        code: 500,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}
