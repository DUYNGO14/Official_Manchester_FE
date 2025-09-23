/* eslint-disable @typescript-eslint/no-explicit-any */ import { RootState } from "@/app/stores";
import { IUser } from "@/app/types/IUser";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  isCalling: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  user: IUser | null;
  param: any;
  type: string;
}
export const initialState: UserState = {
  isCalling: false,
  isSuccess: false,
  isError: false,
  error: null,
  user: null,
  param: null,
  type: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.user = null;
      state.param = null;
    },
    getUserAction: (state, action:PayloadAction<{ id?: string }|undefined>) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = action?.payload;
      state.type = "getUser";
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.user = action.payload;
      state.type = "getUser";
    },
    getUserError: (state, action: PayloadAction<any>) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
      state.type = "getUser";
    },
    updateUserAction: (state, action: PayloadAction<any>) => {
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = action.payload;
      state.type = "updateUser";
    },
    updateUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.user = action.payload;
      state.type = "updateUser";
    },
    updateUserError: (state, action: PayloadAction<any>) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
      state.type = "updateUser";
    },
  },
});
export const { getUserAction, getUserSuccess, getUserError,updateUserAction, updateUserSuccess, updateUserError, reset } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
const selectState = (state: RootState) => state.user;
export const makeSelectData = createSelector(
  selectState,
  (state: UserState) => ({
    user: state.user,
    isCalling: state.isCalling,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error,
    type: state.type
  })
);

export const makeSelectUser = createSelector(
  selectState,
  (state: UserState) => state.user
);
export const makeSelectUserIsCalling = createSelector(
  selectState,
  (state: UserState) => state.isCalling
)