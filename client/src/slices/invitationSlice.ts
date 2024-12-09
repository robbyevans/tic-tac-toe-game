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
  isLoading: boolean;
}

const initialState: InvitationState = {
  invitations: [],
  currentInvitation: null,
  expiryTime: null,
  error: null,
  isLoading: false,
};

// Thunk for sending invitations
export const sendInvitation = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("invitations/sendInvitation", async (receiver_id, { rejectWithValue }) => {
  try {
    await api.post("/invitations", { receiver_id });
    return receiver_id;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.errors?.[0] || "Failed to send invitation."
    );
  }
});

export const acceptInvitation = createAsyncThunk<
  GameResponse,
  number,
  { rejectValue: string }
>("invitations/acceptInvitation", async (invitationId, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/invitations/${invitationId}/respond`, {
      status: "accepted",
    });
    return response.data as GameResponse;
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
    updateCurrentInvitation(state, action) {
      if (state.currentInvitation?.id === action.payload.id) {
        state.currentInvitation = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInvitation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendInvitation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(acceptInvitation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state) => {
        state.isLoading = false;
        // Once accepted, clear the current invitation to avoid confusion.
        state.currentInvitation = null;
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addInvitation,
  clearCurrentInvitation,
  updateCurrentInvitation,
} = invitationSlice.actions;

export default invitationSlice.reducer;
