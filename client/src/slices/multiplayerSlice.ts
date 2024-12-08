// src/slices/multiplayerSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { User } from "../types";

interface MultiplayerState {
  availablePlayers: User[];
  error: string | null;
}

const initialState: MultiplayerState = {
  availablePlayers: [],
  error: null,
};

export const fetchPlayers = createAsyncThunk(
  "multiplayer/fetchPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/players/available");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errors?.[0] || "Failed to fetch players."
      );
    }
  }
);

const multiplayerSlice = createSlice({
  name: "multiplayer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.availablePlayers = action.payload;
        state.error = null;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default multiplayerSlice.reducer;
