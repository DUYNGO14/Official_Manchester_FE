// app/stores/sagas/userSaga.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, patch } from "@/app/common/ajax/client";
import { showNotification } from "@/app/stores/reduces/notification";
import { getUserAction, getUserError, getUserSuccess, updateUserAction, updateUserError, updateUserSuccess } from "@/app/stores/reduces/user";
import { IUser, IUserUpdatePayload } from "@/app/types/IUser";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";


const formatUser = (user: IUser) => {
  const data: IUser = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    age: user.age,
    gender: user.gender,
    email: user.email,
    accountType: user.accountType,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    avatar: user.avatar || null
  }
  return data
}

function* callApiGetProfile(action: PayloadAction<{ id: string } | undefined>): Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    let url = "/users";

    // Kiểm tra nếu payload tồn tại và có id
    if (payload && payload.id) {
      url = `/users/${payload.id}`;
    }

    const response: any = yield call(get, url);

    // Kiểm tra response.data tồn tại trước khi truy cập
    if (response && response.data) {
      const data = formatUser(response.data);
      yield put(getUserSuccess(data));
    } else {
      yield put(getUserError("Invalid response format"));
    }
  } catch (error: any) {
    yield put(getUserError(error.message || "Unknown error"));
  }
}


function* updateProfileUser(
  action: PayloadAction<{ id: string; data: IUserUpdatePayload }>
): Generator<any, void, unknown> {
  try {
    const { id, data } = action.payload;

    const formData = new FormData();
    if (data.fullname && data.fullname.trim() !== "") {
      formData.append("fullname", data.fullname.trim());
    }
    if (data.age && data.age > 0) {
      formData.append("age", data.age.toString());
    }
    if (data.gender) {
      formData.append("gender", data.gender);
    }
    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    console.log("=== Saga FormData ===");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    const response: any = yield call(patch, `/users/update/${id}`, formData);

    if (response && (response.code === 200 || response.status === 200)) {
      const userData = response.data || response;
      const formattedData = formatUser(userData);
      yield put(updateUserSuccess(formattedData));
      yield put(showNotification({ message: "Update successfully", severity: "success" }));
    } else {
      const errorMessage = response?.message || response?.data?.message || "Update failed";
      yield put(updateUserError(errorMessage));
      yield put(showNotification({ message: errorMessage, severity: "error" }));
    }
  } catch (error: any) {
    console.error("=== Saga Error ===", error);

    let errorMessage = "Update user failed";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    yield put(updateUserError(errorMessage));
    yield put(showNotification({ message: errorMessage, severity: "error" }));
  }
}

export default function* userSaga() {
  yield takeLatest(getUserAction.type, callApiGetProfile);
  yield takeLatest(updateUserAction.type, updateProfileUser);
}