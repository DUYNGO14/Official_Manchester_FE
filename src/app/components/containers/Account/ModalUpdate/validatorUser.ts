import yupUtils from "@/app/common/utils/yup.utils";

const userUpdateSchema = yupUtils.object({
  fullname: yupUtils
    .string()
    .min(5, "Ho_ten phải có ít nhất 5 ký tự")
    .max(200, "Ho_ten không được vượt quá 200 ký tự")
    .nullable().nullable(),
  phone_number: yupUtils
    .string()
    .matches(/^[0-9+\-\s()]{10,15}$/, "Số điện thoại không hợp lệ")
    .nullable(),
  address: yupUtils
    .string()
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự")
    .nullable(),
  age: yupUtils
    .number()
    .typeError("Tuổi phải là số")
    .min(1, "Tuổi phải lớn hơn 0")
    .max(150, "Tuổi không hợp lệ")
    .nullable(),
  number: yupUtils
    .number()
    .typeError("Số phải là số")
    .min(0, "Số phải lớn hơn hoặc bằng 0")
    .max(99, "Số phải nhỏ hơn hoặc bằng 99")
    .nullable(),
  gender: yupUtils
    .string()
    .oneOf(["MALE", "FEMALE", "OTHER", ""], "Giới tính không hợp lệ")
    .nullable(),
  avatar: yupUtils
    .mixed<File>()
    .test("fileSize", "Kích thước file quá lớn", (value) => {
      if (!value) return true;
      return value.size <= 5_000_000;
    })
    .test("fileType", "Định dạng file không hỗ trợ", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"].includes(value.type);
    })
    .nullable()

    .nullable(),
});

export default userUpdateSchema;
