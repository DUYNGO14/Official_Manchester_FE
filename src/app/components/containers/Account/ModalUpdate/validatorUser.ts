import { mixed, number, object, string, Schema, ObjectSchema } from 'yup';

// Định nghĩa interface cho dữ liệu form
export interface UserUpdateFormData {
  fullname?: string | null;
  age?: number | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  avatar?: File | null;
}

const userUpdateSchema: ObjectSchema<UserUpdateFormData> = object({
  fullname: string()
    .trim()
    .min(5, "Họ tên phải có ít nhất 5 ký tự")
    .max(200, "Họ tên không được vượt quá 200 ký tự")
    .nullable()
    .default(null)
    .optional(),

  age: number()
    .typeError("Tuổi phải là số")
    .min(1, "Tuổi phải lớn hơn 0")
    .max(150, "Tuổi không hợp lệ")
    .nullable()
    .default(null)
    .optional(),

  gender: mixed<"MALE" | "FEMALE" | "OTHER">()
    .oneOf(["MALE", "FEMALE", "OTHER"])
    .nullable()
    .default(null)
    .optional(),

  avatar: mixed<File>()
    .test("fileSize", "Kích thước file quá lớn", (value) => {
      if (!value) return true;
      return value.size <= 5_000_000;
    })
    .test("fileType", "Định dạng file không hỗ trợ", (value) => {
      if (!value) return true;
      return [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/webp",
      ].includes(value.type);
    })
    .nullable()
    .default(null)
    .optional(),
});

export default userUpdateSchema;