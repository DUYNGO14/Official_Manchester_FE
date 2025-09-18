/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "@/app/common/ajax/client";
import {
  loginAction,
  loginError,
  loginSuccess,
  logoutAction,
  logoutSuccess,
  registerAction,
  registerError,
  registerSuccess,
  verifyAction,
  verifyError,
  verifySuccess
} from "@/app/stores/reduces/auth";
import { showNotification } from "@/app/stores/reduces/notification";
import { LoginPayload, RegisterPayload, VerifyPayload } from "@/app/types/IAuth";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

function* callApiLogin(
  action: PayloadAction<LoginPayload>
): Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    const response: any = yield call(post, "/auth/login", payload);
    if (response.code >= 200 && response.code < 300) {
      yield put(loginSuccess(response.data));
      yield put(
        showNotification({ message: "Login successfully", severity: "success" })
      );
    } else if (response.code === 422) {
      const errorMessage =
        response.errors?.[0]?.message ||
        response.message ||
        "Email hoặc mật khẩu không đúng";
      yield put(loginError(errorMessage));
    } else {
      // Lỗi khác
      yield put(loginError(response.message || "Đăng nhập thất bại"));
    }
  } catch (error: any) {
    console.error("Login saga error:", error);

    // ✅ Xử lý different types of errors
    let errorMessage = "Đã xảy ra lỗi khi đăng nhập";

    if (error.response?.data) {
      // Error từ API response
      const apiError = error.response.data;
      errorMessage =
        apiError.errors?.[0]?.message || apiError.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(loginError(errorMessage));
    yield put(
      showNotification({ message: "Something went wrong", severity: "error" })
    );
  }
}
function* callApiRegister(
  action: PayloadAction<RegisterPayload>
): Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    console.log("Register payload:", payload);
    const response: any = yield call(post, "/auth/register", payload);
    console.log("Register response saga:", response);
    if (response.code >= 200 && response.code < 300) {
      yield put(registerSuccess(response.data));
      yield put(
        showNotification({ message: "Register successfully", severity: "success" })
      );
    } else if (response.code === 422) {
      const errorMessage =
        response.errors?.[0]?.message ||
        response.message ||
        "Đăng kí thất bại";
      yield put(registerError(errorMessage));
    } else {
      // Lỗi khác
      yield put(registerError(response.message || "Đăng kí thất bại"));
    }
  } catch (error: any) {
    console.error("Login saga error:", error);

    // ✅ Xử lý different types of errors
    let errorMessage = "Đã xảy ra lỗi khi đăng kí";

    if (error.response?.data) {
      // Error từ API response
      const apiError = error.response.data;
      errorMessage =
        apiError.errors?.[0]?.message || apiError.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(registerError(errorMessage));
    yield put(
      showNotification({ message: "Something went wrong", severity: "error" })
    );
  }
}
function* callApiVerify(action: PayloadAction<VerifyPayload>) : Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    console.log("Verify payload saga😀:", payload);
    const response: any = yield call(post, "/auth/verify", payload);
    console.log("Verify response saga😀 :", response);
    if (response.code >= 200 && response.code < 300) {
      yield put(verifySuccess(response.data));
      yield put(
        showNotification({ message: "Verify successfully", severity: "success" })
      );
    }else{
      yield put(verifyError(response.message || "Verify thất bại"));
    }
  } catch (error) {
    yield put(verifyError(error));
  }
}

function* callApiLogout(): Generator<any, void, unknown> {
  try {
    
    // Gọi thử API logout (revoke refreshToken nếu cần)
    yield call(post, "/auth/logout", {});

    // Dù thành công hay thất bại thì vẫn clear client state
    yield put(logoutSuccess());
    yield put(
      showNotification({
        message: "Logout successfully",
        severity: "success",
      })
    );

    // Chuyển sang trang login
    window.location.href = "/auth/login";
  } catch (error: any) {
    console.error("Logout saga error:", error);

    // Dù có lỗi thì vẫn clear để đảm bảo user được logout
    yield put(logoutSuccess());
    yield put(
      showNotification({
        message: "You have been logged out",
        severity: "info",
      })
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/auth/login";
  }
}


export default function* authSaga() {
  yield takeLatest(loginAction.type, callApiLogin);
  yield takeLatest(registerAction.type, callApiRegister);
  yield takeLatest(verifyAction.type, callApiVerify);
  yield takeLatest(logoutAction.type, callApiLogout);
}