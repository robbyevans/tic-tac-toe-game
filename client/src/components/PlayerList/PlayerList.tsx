// src/components/PlayerList/PlayerList.tsx
import React from "react";
import * as S from "./styles";
import { IUser } from "@src/types";

interface PlayerListProps {
  players: IUser[];
  sendInvitation: (player: IUser) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, sendInvitation }) => {
  return (
    <S.List>
      {players.map((player) => {
        const statusColor = getStatusColor(player.last_seen_at);
        return (
          <S.ListItem key={player.id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <S.Avatar
                src={player.avatar_url}
                alt={`${player.username}'s avatar`}
              />
              <div>
                <S.Username>{player.username}</S.Username>
                <S.Stars>⭐ {player.stars}</S.Stars>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <S.InviteButton onClick={() => sendInvitation(player)}>
                Invite
              </S.InviteButton>
              <S.StatusDot color={statusColor} />
            </div>
          </S.ListItem>
        );
      })}
    </S.List>
  );
};

// Helper function to determine the color based on last_seen_at
function getStatusColor(last_seen_at?: string): string {
  if (!last_seen_at) {
    // No last seen time recorded - consider them offline (red)
    return "red";
  }
  const lastSeen = new Date(last_seen_at).getTime();
  const now = Date.now();
  const diff = now - lastSeen; // difference in milliseconds

  const fiveMinutes = 5 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;

  if (diff <= fiveMinutes) {
    // online
    return "green";
  } else if (diff <= oneHour) {
    // recent
    return "orange";
  } else {
    // offline
    return "red";
  }
}

export default PlayerList;
