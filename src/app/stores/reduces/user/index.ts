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
}
export const initialState: UserState = {
  isCalling: false,
  isSuccess: false,
  isError: false,
  error: null,
  user: null,
  param: null,
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
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.user = action.payload;
    },
    getUserError: (state, action: PayloadAction<any>) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});
export const { getUserAction, getUserSuccess, getUserError, reset } =
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