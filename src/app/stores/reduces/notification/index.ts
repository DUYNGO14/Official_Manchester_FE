// store/reducers/notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  message: string | null;
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
}

const initialState: NotificationState = {
  message: null,
  severity: "info",
  open: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; severity?: NotificationState["severity"] }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
      state.open = true;
    },
    hideNotification: (state) => {
      state.open = false;
      state.message = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
