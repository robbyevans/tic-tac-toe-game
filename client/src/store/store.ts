// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import gameReducer from "../slices/gameSlice";
import invitationReducer from "../slices/invitationSlice";
import multiplayerReducer from "../slices/multiplayerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    invitations: invitationReducer,
    multiplayer: multiplayerReducer, // Added multiplayerSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
