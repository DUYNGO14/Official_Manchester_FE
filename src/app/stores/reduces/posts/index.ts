/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPosts } from "@/app/types/IPosts";
import { RootState } from "@/app/stores";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
export interface PostState {
  isCalling: boolean;
  isSuccess: boolean;
  isCallingPage?: boolean;
  isError: boolean;
  error: any;
  post: IPosts | null;
  posts: IPosts[] | null;
  param: any;
  pagination: Pagination | null;
  type: string;
}

export const initialState: PostState = {
  isCalling: false,
  isCallingPage: false,
  isSuccess: false,
  isError: false,
  error: null,
  post: null,
  posts: [],
  param: null,
  pagination: null,
  type: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsAction: (state, action: PayloadAction<any>) => {
      if (action.payload.page > 1) {
        state.isCallingPage = true;
        state.isCalling = false;
      } else {
        state.isCallingPage = false;
        state.isCalling = true;
      }
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.type = "getPosts";
      state.param = action.payload;
    },
    getPostDetailAction: (state, action: PayloadAction<any>) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.type = "getPostDetail";
      state.param = action.payload;
    },
    callSuccess: (
      state,
      action: PayloadAction<{
        type: string;
        data: any;
        pagination?: Pagination;
      }>
    ) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isCallingPage = false;
      state.isError = false;
      state.error = null;
      state.type = action.payload.type;
      switch (action.payload.type) {
        case "getPosts":
          state.posts = state.posts
            ? [...state.posts, ...action.payload.data]
            : action.payload.data;
          state.pagination = action.payload.pagination ?? null;
          break;
        case "getPostDetail":
          state.post = action.payload.data;
          break;
        default:
          break;
      }
    },
    callFailed: (
      state,
      action: PayloadAction<{ type: string; error: any }>
    ) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload.error;
      state.type = action.payload.type;
    },
    reset: (state) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.post = null;
      state.posts = [];
      state.param = null;
      state.type = "";
    },
    resetMatch: (state) => {
      state.post = null;
    },
  },
});
export const {
  getPostsAction,
  getPostDetailAction,
  callSuccess,
  callFailed,
  reset,
  resetMatch,
} = postSlice.actions;

export const postReducer = postSlice.reducer;

const selectState = (state: RootState) => state.posts;

export const makeSelectPosts = createSelector(
  selectState,
  (state: PostState) => {
    return {
      posts: state.posts,
      isCalling: state.isCalling,
      isSuccess: state.isSuccess,
      isError: state.isError,
      error: state.error,
      pagination: state.pagination,
    }
  }
);
export const makeSelectListPosts = createSelector(
  selectState,
  (state: PostState) => state.posts || []
);

export const makeSelectPostDetail= createSelector(
  selectState,
  (state: PostState) => state.post || null
);
