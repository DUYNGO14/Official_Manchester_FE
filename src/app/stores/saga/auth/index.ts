/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from "@/app/common/ajax/client";
import accessTokenManager from "@/app/common/utils/auth/accessTokenManager";
import {
  loginAction,
  loginError,
  loginSuccess,
  logoutAction,
  logoutSuccess,
  refreshTokenAction,
  refreshTokenError,
  refreshTokenSuccess,
  registerAction,
  registerError,
  registerSuccess,
  verifyAction,
  verifyError,
  verifySuccess,
} from "@/app/stores/reduces/auth";
import { showNotification } from "@/app/stores/reduces/notification";
import {
  LoginPayload,
  RegisterPayload,
  VerifyPayload,
} from "@/app/types/IAuth";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
function* callApiLogin(
  action: PayloadAction<LoginPayload>
): Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    const response: any = yield call(post, "/auth/login", payload);
    console.log("response saga", response);
    if (response.code >= 200 && response.code < 300) {
      yield put(loginSuccess(response.data.user));
      yield put(
        showNotification({ message: "Login successfully", severity: "success" })
      );
      window?.location?.reload();
    } else if (response.code === 422) {
      const errorMessage =
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
    const response: any = yield call(post, "/auth/register", payload);
    if (response.code >= 200 && response.code < 300) {
      yield put(registerSuccess(response.data));
      yield put(
        showNotification({
          message: "Register successfully",
          severity: "success",
        })
      );
    } else if (response.code === 422) {
      const errorMessage =
        response.errors?.[0]?.message || response.message || "Đăng kí thất bại";
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
function* callApiVerify(
  action: PayloadAction<VerifyPayload>
): Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    const response: any = yield call(post, "/auth/verify", payload);
    if (response.code >= 200 && response.code < 300) {
      yield put(verifySuccess(response.data));
      yield put(
        showNotification({
          message: "Verify successfully",
          severity: "success",
        })
      );
    } else {
      yield put(verifyError(response.message || "Verify thất bại"));
    }
  } catch (error) {
    yield put(verifyError(error));
  }
}

function* callApiLogout(): Generator<any, void, unknown> {
  try {
    yield call(post, "/auth/logout", {});
    yield put(
      showNotification({
        message: "Logout successfully",
        severity: "success",
      })
    );
  } catch (error: any) {
    console.error("Logout saga error:", error);
    yield put(
      showNotification({
        message: "You have been logged out",
        severity: "info",
      })
    );
  } finally {
    yield put(logoutSuccess());
    window.location.href = "/auth/login";
  }
}

function* callApiRefreshToken(): Generator<any, void, unknown> {
  try {
    const response: any = yield call(get, "/auth/refresh-token");
    console.log("response", response);
    if (response.code >= 200 && response.code < 300) {
      accessTokenManager.save(response.data.accessToken, response.data.expired_access_token);
      yield put(refreshTokenSuccess(response.data));
      yield put(
        showNotification({
          message: "Refresh token successfully",
          severity: "success",
        })
      );
    } else {
      yield put(refreshTokenError(response.message || "Refresh token thất bại"));
    }
  } catch (error) {
    yield put(refreshTokenError(error));
  }
}

export default function* authSaga() {
  yield takeLatest(loginAction.type, callApiLogin);
  yield takeLatest(registerAction.type, callApiRegister);
  yield takeLatest(verifyAction.type, callApiVerify);
  yield takeLatest(logoutAction.type, callApiLogout);
  yield takeLatest(refreshTokenAction.type, callApiRefreshToken);
}
