// src/pages/MultiplayerPage/MultiplayerPage.tsx
import React from "react";
import * as S from "./styles";
import BackButton from "@src/components/BackButton/BackButton";
import PlayerList from "@src/components/PlayerList/PlayerList";
import InvitationModal from "@src/components/InvitationModal/InvitationModal";
import ProfileCard from "@src/components/ProfileCard/ProfileCard";
import type { IUser, IInvitation } from "@src/types";

interface MultiplayerPageProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  logout: () => void;
  availablePlayers: IUser[]; // Adjust type as needed
  invitePlayer: (playerId: number) => void;
  currentInvitation: IInvitation | null; // Adjust type as needed
  acceptInvitation: () => void;
  declineInvitation: () => void;
  multiplayerError: string | null;
  invitationError: string | null;
}

const MultiplayerPage: React.FC<MultiplayerPageProps> = ({
  avatarUrl,
  username,
  logout,
  availablePlayers,
  invitePlayer,
  currentInvitation,
  acceptInvitation,
  declineInvitation,
  multiplayerError,
  invitationError,
}) => {
  return (
    <S.PageContainer>
      <BackButton />
      <S.TopBar>
        <ProfileCard
          avatarUrl={avatarUrl || ""}
          username={username}
          onLogout={logout}
        />
      </S.TopBar>
      <S.PageTitle>Multiplayer</S.PageTitle>
      <S.Card>
        {multiplayerError && <S.Error>{multiplayerError}</S.Error>}
        <PlayerList
          players={availablePlayers}
          sendInvitation={(player) => invitePlayer(player.id)}
        />
      </S.Card>
      {currentInvitation && (
        <InvitationModal
          sender={{
            id: currentInvitation.sender_id,
            username: currentInvitation.sender_username,
            avatar_url: currentInvitation.sender_avatar_url || "",
            stars: 0, // Adjust as needed
          }}
          acceptInvitation={acceptInvitation}
          declineInvitation={declineInvitation}
        />
      )}
      {invitationError && <S.Error>{invitationError}</S.Error>}
    </S.PageContainer>
  );
};

export default MultiplayerPage;
