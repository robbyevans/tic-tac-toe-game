// src/hooks/useInvitations.ts

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  sendInvitation,
  acceptInvitation,
  addInvitation,
  clearCurrentInvitation,
} from "../slices/invitationSlice";
import { Invitation } from "../types";
import { AppDispatch } from "../store/store";

const useInvitations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { invitations, currentInvitation, error } = useSelector(
    (state: RootState) => state.invitations
  );

  // Methods to interact with the invitations slice
  const send = (receiver_id: number) => dispatch(sendInvitation(receiver_id));
  const accept = (invitationId: number) =>
    dispatch(acceptInvitation(invitationId));
  const add = (invitation: Invitation) => dispatch(addInvitation(invitation));
  const clear = () => dispatch(clearCurrentInvitation());

  return {
    invitations,
    currentInvitation,
    error,
    send,
    accept,
    add,
    clear,
  };
};

export default useInvitations;
