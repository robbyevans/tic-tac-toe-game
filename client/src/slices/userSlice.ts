// src/slices/userSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api"; // Ensure this is your configured Axios instance
import { RootState } from "../store/store";

interface User {
  id: number;
  username: string;
  avatar_url?: string;
  email: string;
  stars: number;
}

interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("jwt_token"),
};

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk<User, void, { state: RootState }>(
  "user/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.user.user?.id;
    if (!userId) {
      return rejectWithValue("No user ID found");
    }
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errors || "Failed to fetch user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("jwt_token", action.payload);
      } else {
        localStorage.removeItem("jwt_token");
      }
    },
    userLogout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("jwt_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.error("Fetch user failed:", action.payload);
      });
  },
});

export const { setUser, setToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
