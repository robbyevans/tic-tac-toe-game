// src/contexts/CableContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  PropsWithChildren,
} from "react";
import ActionCable from "actioncable";
import getCable from "@src/utils/actionCable";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/store/store";
import {
  addInvitation,
  clearCurrentInvitation,
} from "@src/slices/invitationSlice";
import { useNavigate } from "react-router-dom";

interface CableContextValue {
  cable: ActionCable.Cable | null;
}

const CableContext = createContext<CableContextValue>({ cable: null });

export const CableProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!token || !user) return;

    const cable = getCable(token);

    // Invitations Subscription
    const invitationsSubscription = cable.subscriptions.create(
      { channel: "InvitationsChannel" },
      {
        received(data: any) {
          console.log("Received invitation:", data);
          if (data.type === "NEW_INVITATION" && data.invitation) {
            dispatch(addInvitation(data.invitation));
          } else if (data.type === "INVITATION_EXPIRED") {
            dispatch(clearCurrentInvitation());
            alert("Invitation expired.");
          } else if (data.type === "GAME_STARTED" && data.game_id) {
            navigate(`/game/${data.game_id}`);
          }
        },
      }
    );

    // Players Subscription
    const playersSubscription = cable.subscriptions.create("PlayersChannel", {
      received(data: any) {
        if (data.type === "PLAYER_LIST_UPDATED") {
          // Dispatch an action or handle player list update
          // e.g., dispatch(fetchPlayers());
          // Ensure you have a corresponding action and slice to handle this
        }
      },
    });

    // Games Subscription (if needed globally)
    // const gamesSubscription = cable.subscriptions.create(...);

    return () => {
      invitationsSubscription.unsubscribe();
      playersSubscription.unsubscribe();
      // gamesSubscription.unsubscribe();
      // Do not disconnect the cable here as it's a singleton
    };
  }, [dispatch, token, user, navigate]);

  return (
    <CableContext.Provider value={{ cable: token ? getCable(token) : null }}>
      {children}
    </CableContext.Provider>
  );
};

export const useCable = () => useContext(CableContext);
