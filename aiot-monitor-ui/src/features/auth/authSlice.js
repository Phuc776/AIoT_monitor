import { jwtDecode } from "jwt-decode";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthAPI from "../../services/apis/endpoints/auth";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk để login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await AuthAPI.login({ username, password });
      const token = res.data.jwtToken; // lấy trực tiếp từ res.data
      const decoded = jwtDecode(token);
      const userInfo = {
        username: decoded.sub, // hoặc decoded.username tuỳ token
        role: decoded.role,
        // … bạn có thể thêm email, id… nếu token có
      };
      return {
        user: userInfo,
        access_token: token,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Thunk để reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ username }, { rejectWithValue }) => {
    try {
      const res = await AuthAPI.resetPassword({ username });
      return res.data.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.data?.message || "Reset failed"
      );
    }
  }
);

// Thunk để update password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await AuthAPI.updatePassword(
        { oldPassword, newPassword },
        token
      );
      return res.data.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.data?.message || "Update failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
    },
  },
  extraReducers(builder) {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("authToken", action.payload.access_token);
        localStorage.setItem("role", action.payload.user.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // resetPassword
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // updatePassword
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
