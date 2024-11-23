import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./slice/pasteSlice.js"

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
