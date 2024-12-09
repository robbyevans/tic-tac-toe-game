// src/hooks/useInvitations.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import createCable from "../utils/actionCable";
import { useNavigate } from "react-router-dom";
import {
  addInvitation,
  clearCurrentInvitation,
  acceptInvitation,
} from "../slices/invitationSlice";
import { RootState, AppDispatch } from "../store/store";
import { Invitation } from "../types";
import { GameResponse } from "../slices/invitationSlice";

interface InvitationData {
  type: "NEW_INVITATION" | "INVITATION_EXPIRED" | "GAME_STARTED";
  invitation?: Invitation;
  game_id?: number;
}

const useInvitations = (userId: number | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentInvitation, expiryTime } = useSelector(
    (state: RootState) => state.invitations
  );
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userId || !token) return;

    const cable = createCable(token);

    const subscription = cable.subscriptions.create(
      { channel: "InvitationsChannel" },
      {
        received(data: InvitationData) {
          console.log("Received data:", data);
          if (data.type === "NEW_INVITATION" && data.invitation) {
            dispatch(addInvitation(data.invitation));
          } else if (data.type === "INVITATION_EXPIRED") {
            dispatch(clearCurrentInvitation());
            alert("Invitation expired.");
          } else if (data.type === "GAME_STARTED" && data.game_id) {
            // Redirect to the game page for both players
            navigate(`/game/${data.game_id}`);
          }
        },
      }
    );

    // Automatically clear expired invitations if time passed
    if (expiryTime && Date.now() > expiryTime) {
      dispatch(clearCurrentInvitation());
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, token, dispatch, expiryTime, navigate]);

  const handleAcceptInvitation = async (
    invitationId: number
  ): Promise<GameResponse | null> => {
    try {
      const result = await dispatch(acceptInvitation(invitationId)).unwrap();
      // Once we get a successful accept, server should broadcast `GAME_STARTED`.
      // If you want to redirect immediately, you can:
      // navigate(`/game/${result.game.id}`);
      return result;
    } catch (error) {
      console.error("Error in handleAcceptInvitation:", error);
      return null;
    }
  };

  return { currentInvitation, handleAcceptInvitation };
};

export default useInvitations;
