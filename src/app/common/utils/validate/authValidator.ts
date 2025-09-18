export function validateEmail(email?: string | undefined) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && emailRegex.test(email)) {
    return { type: "email", value: email, success: true };
  }
  return {
    success: false,
    message: "Email is not in correct format",
  };
}

export function validatePhoneNumber(phoneNumber?: string | undefined) {
  const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;

  if (phoneNumber && phoneRegex.test(phoneNumber)) {
    return { type: "phone", value: phoneNumber, success: true };
  }

  return {
    success: false,
    message: "Phone number is not in correct format",
  };
}

export function validatePassword(password?: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!password) {
    return { success: false, message: "Password is required" };
  }

  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message:
        "Password must be at least 6 characters long, include uppercase, lowercase, number, and special character",
    };
  }

  return { type: "password", value: password, success: true };
}
