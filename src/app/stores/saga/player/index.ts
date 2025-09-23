/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "@/app/common/ajax/client";
import { showNotification } from "@/app/stores/reduces/notification";
import { getPlayerAction, getPlayerError, getPlayerSuccess } from "@/app/stores/reduces/player";
import { IPlayer } from "@/app/types/IPlayer";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

function* callApiGetAllPlayer(action: PayloadAction<{player_type : string, position? : string,nationality? : string}>): Generator<any, void, unknown> {
  try {
    const params = action.payload;
    console.log("params", params);
    const response: any = yield call(get, `/players`, params as Record<string, unknown>);
    if(response.code === 200){
      yield put(getPlayerSuccess(response.data));
    }else{
      yield put(getPlayerError(response.message || "Get player error!"));
      yield put(showNotification({ message: response.message || "Get player error!", severity: "error" }));
    }
    
  } catch (error: any) {
    yield put(getPlayerError(error.message || "Unknown error"));
    yield put(showNotification({ message: error.message || "Unknown error", severity: "error" }));
  }
}

export default function* playerSaga() {
  yield takeLatest(getPlayerAction.type, callApiGetAllPlayer);
}