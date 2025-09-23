import { format } from "date-fns";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "@/app/common/ajax/client";
import {
  callFailed,
  callSuccess,
  getPostDetailAction,
  getPostsAction,
} from "@/app/stores/reduces/posts";
import { IPosts } from "@/app/types/IPosts";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

const formatPost = (post: any): IPosts => ({
  _id: post._id,
  content: post.content,
  title: post.title,
  views: post.views,
  summary: post.summary,
  slug: post.slug,
  thumbnail: post.thumbnail,
  category: {
    _id: post.categoryId._id,
    name: post.categoryId.name,
    slug: post.categoryId.slug,
  },

  author: {
    _id: post.authorId._id,
    fullName: post.authorId.username,
    image: post.authorId.avatar?.url,
  },
  publishedAt: post.publishedAt,
});
function* callApiGetAll(
  action: PayloadAction<any>
): Generator<any, void, unknown> {
  try {
    const params = action.payload;
    let url = "/posts";
    if(!params){
      url  = "/posts/latest";
    }
    const response: any = yield call(
      get,
      url,
      params as Record<string, unknown>
    );
    yield put(
      callSuccess({
        type: "getPosts",
        data: response.data,
        pagination: response.pagination,
        param: params,
      })
    );
  } catch (error: any) {
    yield put(callFailed({ type: "getPosts", error: error.message }));
  }
}

function* callApiGetPostBySlug(
  action: PayloadAction<{ slug: string }>
): Generator<any, void, unknown> {
  try {
    const payload = action.payload;
    console.log("payload", payload);
    const response: any = yield call(get, `/posts/${payload.slug}`, payload);
    console.log("response saga", response);
    if (response.code === 200) {
      const data =formatPost(response.data);
      yield put(
        callSuccess({
          type: "getPostDetail",
          data: data,
        })
      );
    } else {
      yield put(callFailed({ type: "getPostDetail", error: response.message }));
    }
  } catch (error: any) {
    yield put(callFailed({ type: "getPostDetail", error: error.message }));
  }
}
export default function* postsSaga() {
  yield takeLatest(getPostsAction.type, callApiGetAll);
  yield takeLatest(getPostDetailAction.type, callApiGetPostBySlug);
}
