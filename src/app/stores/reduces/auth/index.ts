/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/stores";
export interface AuthState {
  isCalling: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: any;
  data?: any;
  param?: any;
  type?: string;
}

export const initialState: AuthState = {
  isCalling: false,
  isSuccess: false,
  isError: false,
  error: null,
  data: null,
  param: null,
  type: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = action.payload;
      state.type = "login";
    },
    loginSuccess: (state, action) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.data = action.payload;
      state.type = "login";
    },
    loginError: (state, action) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
      state.type = "login";
    },
    registerAction: (state, action) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = action.payload;
      state.type = "register";
    },
    registerSuccess: (state, action) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.data = action.payload;
      state.type = "register";
    },
    registerError: (state, action) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
      state.type = "register";
    },
    logoutAction: (state) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = null;
      state.type = "logout";
    },
    logoutSuccess: (state) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.data = null;
      state.type = "logout";
    },
    logoutError: (state, action) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
      state.type = "logout";
    },
    reset: (state) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.data = null;
      state.param = null;
      state.type = "";
    },
    verifyAction: (state, action) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = action.payload;
      state.type = "verify";
    },
    verifySuccess: (state, action) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.data = action.payload;
      state.type = "verify";
    },
    verifyError: (state, action) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
      state.type = "verify";
    },
  },
});

export const {
  loginAction,
  loginSuccess,
  loginError,
  registerAction,
  registerSuccess,
  registerError,
  logoutAction,
  logoutSuccess,
  logoutError,
  verifyAction,
  verifySuccess,
  verifyError,
  reset,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

const selectState = (state: RootState) => state.auth;

export const makeSelectAuth = createSelector(
  selectState,
  (state: AuthState) => state
);
export const makeSelectAuthData = createSelector(
  selectState,
  (state: AuthState) => state.data || {token:null, account:null}
);
export const makeSelectAuthError = createSelector(
  selectState,
  (state: AuthState) => state.error
);
export const makeSelectAuthIsCalling = createSelector(
  selectState,
  (state: AuthState) => state.isCalling
);
export const makeSelectAuthIsSuccess = createSelector(
  selectState,
  (state: AuthState) => state.isSuccess
);
export const makeSelectAuthIsError = createSelector(
  selectState,
  (state: AuthState) => state.isError
);
export const makeSelectAuthType = createSelector(
  selectState,
  (state: AuthState) => state.type
);