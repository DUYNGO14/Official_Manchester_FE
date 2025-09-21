// app/stores/sagas/userSaga.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "@/app/common/ajax/client";
import { getUserAction, getUserError, getUserSuccess } from "@/app/stores/reduces/user";
import { IUser } from "@/app/types/IUser";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

function* callApiGetProfile(action: PayloadAction<{id: string} | undefined>) : Generator<any, void, unknown> {
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
      const data: IUser = {
        _id: response.data._id,
        fullname: response.data.fullname,
        username: response.data.username,
        email: response.data.email,
        accountType: response.data.accountType,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
        number: response.data.number,
        avatar: response.data.avatar || null
      }
      yield put(getUserSuccess(data));
    } else {
      yield put(getUserError("Invalid response format"));
    }
  } catch (error: any) {
    yield put(getUserError(error.message || "Unknown error"));
  }
}

export default function* userSaga() {
  yield takeLatest(getUserAction.type, callApiGetProfile);
}