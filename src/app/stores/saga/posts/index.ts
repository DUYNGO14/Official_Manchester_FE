/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "@/app/common/ajax/client";
import { callFailed, callSuccess, getPostsAction } from "@/app/stores/reduces/posts";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

function* callApiGetAll(action : PayloadAction<any>) : Generator<any, void, unknown> {

  try {
    const params = action.payload;
    const response: any = yield call(
      get,
      "/posts",
      params as Record<string, unknown>
    );
    console.log("response saga", response);
    yield put(
      callSuccess({
        type: "getPosts",
        data: response.data,
        pagination: response.pagination,
      })
    );
  } catch (error : any) {
    yield put(callFailed({ type: "getPosts", error: error.message }));
  }
}
export default function* postsSaga() {
  yield takeLatest(getPostsAction.type, callApiGetAll);
}