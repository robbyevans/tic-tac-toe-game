// src/hooks/useMultiplayer.ts
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { fetchPlayers } from "@src/slices/multiplayerSlice";
import {
  sendInvitation,
  acceptInvitation,
  clearCurrentInvitation,
} from "@src/slices/invitationSlice";

export const useMultiplayer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { availablePlayers, error: multiplayerError } = useSelector(
    (state: RootState) => state.multiplayer
  );
  const { currentInvitation, error: invitationError } = useSelector(
    (state: RootState) => state.invitations
  );

  const loadPlayers = () => dispatch(fetchPlayers());
  const invitePlayer = (playerId: number) => dispatch(sendInvitation(playerId));
  const acceptCurrentInvitation = (invitationId: number) =>
    dispatch(acceptInvitation(invitationId));
  const declineInvitation = () => dispatch(clearCurrentInvitation());

  return {
    availablePlayers,
    currentInvitation,
    multiplayerError,
    invitationError,
    loadPlayers,
    invitePlayer,
    acceptInvitation: acceptCurrentInvitation,
    declineInvitation,
  };
};
