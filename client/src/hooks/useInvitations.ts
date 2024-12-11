// src/hooks/useInvitations.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentInvitation,
  acceptInvitation,
} from "@src/slices/invitationSlice";
import { RootState, AppDispatch } from "@src/store/store";
import { GameResponse } from "@src/slices/invitationSlice";

const useInvitations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentInvitation, expiryTime } = useSelector(
    (state: RootState) => state.invitations
  );

  useEffect(() => {
    // Handle expiry logic if needed, based on expiryTime
    if (expiryTime && Date.now() > expiryTime) {
      dispatch(clearCurrentInvitation());
      alert("Invitation expired.");
    }
  }, [expiryTime, dispatch]);

  const handleAcceptInvitation = async (
    invitationId: number
  ): Promise<GameResponse | null> => {
    try {
      const result = await dispatch(acceptInvitation(invitationId)).unwrap();
      // Once accepted, the server should broadcast `GAME_STARTED`
      return result;
    } catch (error) {
      console.error("Error in handleAcceptInvitation:", error);
      return null;
    }
  };

  return { currentInvitation, handleAcceptInvitation };
};

export default useInvitations;
