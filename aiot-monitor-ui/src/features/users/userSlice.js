// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../services/apis/endpoints/user";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

// Thunk để tạo user
export const createUser = createAsyncThunk(
  "users/create",
  async ({ data, role }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await UserAPI.createUser({ ...data, role }, token);
      return res.data.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.data?.message || "Create user failed"
      );
    }
  }
);

// Thunk load danh sách users (ví dụ để hiển thị trên dashboard)
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await UserAPI.fetchAll(token);
      return res.data.data.users;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.data?.message || "Fetch users failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default userSlice.reducer;
