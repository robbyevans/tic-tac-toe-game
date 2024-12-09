// src/pages/MultiplayerPage.tsx
import React, { useEffect } from "react";
import * as S from "../styles/styledComponents";
import PlayerList from "../components/PlayerList";
import InvitationModal from "../components/InvitationModal";
import { useMultiplayer } from "../hooks/useMultiplayer";
import useInvitations from "../hooks/useInvitations";
import { useUser } from "../hooks/useUser";
import ProfileIcon from "../components/ProfileIcon";
import { useNavigate } from "react-router-dom";
import { PageContainer, PageTitle, Card } from "../styles/styledPages";

const MultiplayerPage: React.FC = () => {
  const { user, logout } = useUser();
  const { currentInvitation, handleAcceptInvitation } = useInvitations(
    user?.id || null
  );
  const navigate = useNavigate();

  const { availablePlayers, loadPlayers, invitePlayer, declineInvitation } =
    useMultiplayer();

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
    <PageContainer>
      <S.TopBar>
        <ProfileIcon
          avatarUrl={user?.avatar_url || ""}
          username={user?.username}
          onLogout={logout}
        />
      </S.TopBar>
      <PageTitle>Multiplayer</PageTitle>
      <Card>
        <PlayerList
          players={availablePlayers}
          sendInvitation={(player) => invitePlayer(player.id)}
        />
      </Card>
      {currentInvitation && (
        <InvitationModal
          sender={{
            id: currentInvitation.sender_id,
            username: currentInvitation.sender_username,
            avatar_url: currentInvitation.sender_avatar_url || "",
            stars: 0,
          }}
          acceptInvitation={handleAccept}
          declineInvitation={declineInvitation}
        />
      )}
    </PageContainer>
  );
};

export default MultiplayerPage;
