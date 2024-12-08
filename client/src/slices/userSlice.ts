// src/slices/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setUser, setToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
