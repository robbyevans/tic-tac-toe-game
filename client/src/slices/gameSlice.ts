// src/slices/gameSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../types";

interface GameState {
  currentGame: Game | null;
}

const initialState: GameState = {
  currentGame: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame(state, action: PayloadAction<Game>) {
      state.currentGame = action.payload;
    },
    updateGame(state, action: PayloadAction<Game>) {
      state.currentGame = action.payload;
    },
    clearGame(state) {
      state.currentGame = null;
    },
  },
});

export const { setGame, updateGame, clearGame } = gameSlice.actions;

export default gameSlice.reducer;
