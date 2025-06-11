import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    counter: counterReducer,
  },
});
