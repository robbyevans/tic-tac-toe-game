// src/containers/MultiplayerPageContainer.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiplayerPage from "@src/pages/MultiplayerPage/MultiplayerPage";
import { useMultiplayer } from "@src/hooks/useMultiplayer";
import useInvitations from "@src/hooks/useInvitations";
import { useUser } from "@src/hooks/useUser";

const MultiplayerPageContainer: React.FC = () => {
  const { user, logout } = useUser();
  const { currentInvitation, handleAcceptInvitation } = useInvitations();
  const navigate = useNavigate();

  const {
    availablePlayers,
    loadPlayers,
    invitePlayer,
    declineInvitation,
    multiplayerError,
    invitationError,
  } = useMultiplayer();

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleAccept = async () => {
    if (currentInvitation?.id) {
      try {
        const response = await handleAcceptInvitation(currentInvitation.id);
        if (response?.game?.id) {
          navigate(`/game/${response.game.id}`);
        }
      } catch (error) {
        console.error("Error accepting invitation:", error);
      }
    } else {
      console.error("Invalid invitation ID:", currentInvitation);
    }
  };

  return (
    <MultiplayerPage
      avatarUrl={user?.avatar_url}
      username={user?.username}
      logout={logout}
      availablePlayers={availablePlayers}
      invitePlayer={invitePlayer}
      currentInvitation={currentInvitation}
      acceptInvitation={handleAccept}
      declineInvitation={declineInvitation}
      multiplayerError={multiplayerError}
      invitationError={invitationError}
    />
  );
};

export default MultiplayerPageContainer;
