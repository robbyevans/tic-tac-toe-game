// src/components/InvitationsListener/InvitationsListener.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addInvitation } from "@src/slices/invitationSlice";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import getCable from "@src/utils/actionCable"; // Updated import

const InvitationsListener: React.FC = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!token || !user) {
      console.error("No token or user found for Action Cable connection.");
      return;
    }

    const cable = getCable(token); // Use singleton consumer

    const subscription = cable.subscriptions.create("InvitationsChannel", {
      received(data: any) {
        console.log("Received invitation:", data);
        dispatch(addInvitation(data));
      },
    });

    return () => {
      subscription.unsubscribe();
      // Do not disconnect the cable here
      // cable.disconnect(); // Remove this line
    };
  }, [dispatch, token, user]);

  return null; // This component does not render anything
};

export default InvitationsListener;
