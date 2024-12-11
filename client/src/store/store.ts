// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@src/slices/userSlice";
import gameReducer from "@src/slices/gameSlice";
import invitationReducer from "@src/slices/invitationSlice";
import multiplayerReducer from "@src/slices/multiplayerSlice";
import chatReducer from "@src/slices/chatSlice"; // If you have a chat slice

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    invitations: invitationReducer,
    multiplayer: multiplayerReducer,
    chat: chatReducer, // If you have a chat slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
