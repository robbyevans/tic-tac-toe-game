// src/pages/MultiplayerPage.tsx
import React, { useEffect } from "react";
import * as S from "../styles/styledComponents";
import PlayerList from "../components/PlayerList";
import InvitationModal from "../components/InvitationModal";
import { useMultiplayer } from "../hooks/useMultiplayer";
import useInvitations from "../hooks/useInvitations";
import { useUser } from "../hooks/useUser";
import ProfileIcon from "../components/ProfileIcon";

const MultiplayerPage: React.FC = () => {
  const { user, logout } = useUser();
  const { currentInvitation } = useInvitations();

  useEffect(() => {
    console.log("currentInvitation", currentInvitation);
  }, [currentInvitation]);

  const {
    availablePlayers,
    loadPlayers,
    invitePlayer,
    acceptCurrentInvitation,
    declineInvitation,
  } = useMultiplayer();

  console.log("currentInvitation", currentInvitation);

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <S.Container>
      <S.TopBar>
        <ProfileIcon
          avatarUrl={user?.avatar_url}
          username={user?.username}
          onLogout={handleLogout}
        />
      </S.TopBar>
      <S.Title>Multiplayer</S.Title>
      <PlayerList
        players={availablePlayers}
        sendInvitation={(player) => invitePlayer(player.id)}
      />
      {currentInvitation && (
        <InvitationModal
          sender={{
            id: currentInvitation.sender_id,
            username: currentInvitation.sender_username,
            avatar_url: currentInvitation.sender_avatar_url || "",
            stars: 0,
            email: "",
          }}
          acceptInvitation={() =>
            acceptCurrentInvitation(currentInvitation.invitation_id)
          }
          declineInvitation={declineInvitation}
        />
      )}
    </S.Container>
  );
};

export default MultiplayerPage;
