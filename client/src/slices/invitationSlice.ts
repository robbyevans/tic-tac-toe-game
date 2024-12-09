// src/slices/invitationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { Invitation, Game } from "../types";

export interface GameResponse {
  game: Game;
}

interface InvitationState {
  invitations: Invitation[];
  currentInvitation: Invitation | null;
  expiryTime: number | null;
  error: string | null;
}

const initialState: InvitationState = {
  invitations: [],
  currentInvitation: null,
  expiryTime: null,
  error: null,
};

// Thunk for sending invitations
export const sendInvitation = createAsyncThunk(
  "invitations/sendInvitation",
  async (receiver_id: number, { rejectWithValue }) => {
    try {
      await api.post("/invitations", { receiver_id });
      return receiver_id; // Optional: return receiver ID for UI feedback
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errors?.[0] || "Failed to send invitation."
      );
    }
  }
);

export const acceptInvitation = createAsyncThunk<
  GameResponse, // Return type of the thunk
  number, // Argument type for the thunk
  { rejectValue: string }
>("invitations/acceptInvitation", async (invitationId, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/invitations/${invitationId}/respond`, {
      status: "accepted",
    });
    return response.data as GameResponse; // Ensure response matches GameResponse
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.errors?.[0] || "Failed to accept invitation."
    );
  }
});

const invitationSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    addInvitation(state, action) {
      state.invitations.push(action.payload);
      state.currentInvitation = action.payload;
      state.expiryTime = Date.now() + 30000;
    },
    clearCurrentInvitation(state) {
      state.currentInvitation = null;
      state.expiryTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptInvitation.fulfilled, (state) => {
        state.currentInvitation = null; // Clear current invitation after acceptance
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addInvitation, clearCurrentInvitation } =
  invitationSlice.actions;

export default invitationSlice.reducer;
