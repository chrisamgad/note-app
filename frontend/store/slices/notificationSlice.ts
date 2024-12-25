import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface NotificationState {
  message: string;
  type: "success" | "error" | "info" | ""; // specific values only allowed
  isVisible: boolean;
}


const initialState: NotificationState = {
  message: "",
  type: "",
  isVisible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    
    // action to clear a notification
    clearNotification: (state) => {
      state.message = "";
      state.type = "";
      state.isVisible = false;
    },
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
