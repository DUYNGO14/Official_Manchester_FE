// components/Notification.tsx
"use client";

import { RootState } from "@/app/stores";
import { hideNotification } from "@/app/stores/reduces/notification";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, severity, open } = useSelector((state: RootState) => state.notification);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideNotification())}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={() => dispatch(hideNotification())} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
