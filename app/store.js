import { configureStore } from "@reduxjs/toolkit";
import user from "@/feature/reducer/user";

export const store = configureStore({
  reducer: {
    user,
  },
});
