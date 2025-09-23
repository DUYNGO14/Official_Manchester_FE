/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { patch } from "@/app/common/ajax/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const formData = await req.formData();
    const fullname = formData.get("fullname") as string | null;
    const ageStr = formData.get("age") as string | null;
    const gender = formData.get("gender") as "MALE" | "FEMALE" | "OTHER" | null;
    const avatar = formData.get("avatar") as File | null;

    // Create FormData for NestJS - this will work with FileInterceptor
    const nestFormData = new FormData();

    // Add regular fields that will be captured by @Body()
    if (fullname && fullname.trim() !== "") {
      nestFormData.append("fullname", fullname.trim());
    }
    if (ageStr && ageStr.trim() !== "") {
      nestFormData.append("age", ageStr);
    }
    if (gender && ["MALE", "FEMALE", "OTHER"].includes(gender)) {
      nestFormData.append("gender", gender);
    }

    // Add file that will be captured by @UploadedFile() with FileInterceptor('avatar')
    if (avatar && avatar.size > 0 && avatar.name !== "undefined") {
      // Use the original File object - this preserves all metadata
      nestFormData.append("avatar", avatar, avatar.name);
    }

    console.log("=== Sending to NestJS ===");
    for (const [key, value] of nestFormData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Send FormData directly - axios will handle Content-Type with boundary
    const response: any = await patch(`/users/${userId}`, nestFormData);
    
    console.log("=== Response from NestJS ===", response);
    
    // Handle NestJS response format
    if (response?.statusCode >= 400 || response?.error) {
      return NextResponse.json(
        {
          message: response.message || "Update failed",
          errors: response.errors || [],
          code: response.statusCode || 400,
        },
        { status: response.statusCode || 400 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        code: 200,
        message: response.data?.message || "Update profile successfully",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update user info error:", error);
    
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