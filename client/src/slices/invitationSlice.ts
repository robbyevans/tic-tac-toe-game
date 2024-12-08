// src/slices/invitationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { Invitation } from "../types";

interface InvitationState {
  invitations: Invitation[];
  currentInvitation: Invitation | null;
  error: string | null;
}

const initialState: InvitationState = {
  invitations: [],
  currentInvitation: null,
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

// Thunk for accepting an invitation
export const acceptInvitation = createAsyncThunk(
  "invitations/acceptInvitation",
  async (invitationId: number, { rejectWithValue }) => {
    try {
      const response = await api.put(`/invitations/${invitationId}`, {
        status: "accepted",
      });
      return response.data.game; // Returns the updated game
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errors?.[0] || "Failed to accept invitation."
      );
    }
  }
);

const invitationSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    addInvitation(state, action) {
      state.invitations.push(action.payload);
      state.currentInvitation = action.payload;
    },
    clearCurrentInvitation(state) {
      state.currentInvitation = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
