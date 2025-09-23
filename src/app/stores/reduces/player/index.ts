import { pl } from 'date-fns/locale';
/* eslint-disable @typescript-eslint/no-explicit-any */ import { RootState } from "@/app/stores";
import { IPlayer } from "@/app/types/IPlayer";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  isCalling: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  data: IPlayer | IPlayer[] | null;
  param: any;
}
export const initialState: UserState = {
  isCalling: false,
  isSuccess: false,
  isError: false,
  error: null,
  data: null,
  param: null,
};
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    reset: (state) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.data = null;
      state.param = null;
    },
    getPlayerAction: (state, action:PayloadAction<any>) => {
      console.log("action", action.payload);
      state.isCalling = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.param = action?.payload;
    },
    getPlayerSuccess: (state, action: PayloadAction<IPlayer | IPlayer[]>) => {
      state.isCalling = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.data = action.payload;
    },
    getPlayerError: (state, action: PayloadAction<any>) => {
      state.isCalling = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});
export const { reset, getPlayerAction, getPlayerSuccess, getPlayerError } =
  playerSlice.actions;
export const playerReducer = playerSlice.reducer;
const selectState = (state: RootState) => state.player;
export const makeSelectData = createSelector(
  selectState,
  (state: UserState) => ({
    data: state.data,
    isCalling: state.isCalling,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error
  })
);

export const makeSelectPlayers = createSelector(
  selectState,
  (state: UserState) => state.data
);
export const makeSelectPlayersIsCalling = createSelector(
  selectState,
  (state: UserState) => state.isCalling
)