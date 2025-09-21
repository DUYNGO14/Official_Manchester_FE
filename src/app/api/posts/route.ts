/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "@/app/common/ajax/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const limit = url.searchParams.get("limit") || "5";
    const sort = url.searchParams.get("sort") || "asc";
    const order = url.searchParams.get("sortOrder") || "createdAt";
    const param : Record<string, string> = {
      page,
      limit,
      sort,
      order
    }

    const response: any = await get("/articles", param);

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
    let pagination;
    if(response.data.limit  && response.data.page && response.data.totalPage && response.data.total) {
      pagination = null
    }else{
      pagination = {
        limit: response.data.limit,
        page: response.data.page,
        totalPage: response.data.totalPage,
        total: response.data.total
      }
    }

    return NextResponse.json(
      {
        code: 200,
        message: response.data?.message || "Get matches successfully",
        data: response.data.data,
        pagination: pagination,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get matches info error:", error);

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