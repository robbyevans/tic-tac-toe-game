// src/slices/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
}

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    clearChat(state) {
      state.messages = [];
    },
  },
});

export const { addChatMessage, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
