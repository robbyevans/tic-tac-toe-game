import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import createCable from "../utils/actionCable";
import {
  addInvitation,
  clearCurrentInvitation,
  acceptInvitation,
} from "../slices/invitationSlice";
import { RootState } from "../store/store";
import { Invitation } from "../types";
import { AppDispatch } from "../store/store"; // Import the store's dispatch type
import { GameResponse } from "../slices/invitationSlice";

interface InvitationData {
  type: "NEW_INVITATION" | "INVITATION_EXPIRED";
  invitation?: Invitation;
}

const useInvitations = (userId: number | null) => {
  const dispatch: AppDispatch = useDispatch(); // Explicitly type dispatch
  const { currentInvitation, expiryTime } = useSelector(
    (state: RootState) => state.invitations
  );

  useEffect(() => {
    if (!userId) return;

    const cable = createCable(localStorage.getItem("jwt_token"));

    const subscription = cable.subscriptions.create(
      { channel: "InvitationsChannel" },
      {
        received(data: InvitationData) {
          if (data.type === "NEW_INVITATION") {
            dispatch(addInvitation(data.invitation));
          } else if (data.type === "INVITATION_EXPIRED") {
            dispatch(clearCurrentInvitation());
            alert("Invitation expired.");
          }
        },
      }
    );

    if (expiryTime && Date.now() > expiryTime) {
      dispatch(clearCurrentInvitation());
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, dispatch, expiryTime]);

  const handleAcceptInvitation = async (
    invitationId: number
  ): Promise<GameResponse | null> => {
    try {
      const result = await dispatch(acceptInvitation(invitationId)).unwrap();
      return result; // The result will be of type GameResponse
    } catch (error) {
      console.error("Error in handleAcceptInvitation:", error);
      return null;
    }
  };

  return { currentInvitation, handleAcceptInvitation };
};

export default useInvitations;
