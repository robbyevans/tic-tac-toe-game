// src/components/InvitationsListener.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInvitation } from "../slices/invitationSlice";
import { RootState } from "../store/store";
import ActionCable from "actioncable";

const InvitationsListener: React.FC = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!token || !user) {
      console.error("No token or user found for Action Cable connection.");
      return;
    }

    const cable = ActionCable.createConsumer(
      `ws://192.168.8.3:3000/cable?token=${token}`
    );

    const subscription = cable.subscriptions.create(
      { channel: "InvitationsChannel" },
      {
        connected() {
          console.log("Connected to InvitationsChannel");
        },

        disconnected() {
          console.log("Disconnected from InvitationsChannel");
        },

        received(data: any) {
          console.log("Received invitation:", data);
          dispatch(addInvitation(data));
        },
      }
    );

    return () => {
      subscription.unsubscribe();
      cable.disconnect();
    };
  }, [dispatch, token, user]);

  return null;
};

export default InvitationsListener;
