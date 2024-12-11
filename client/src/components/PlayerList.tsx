import React from "react";
import styled from "styled-components";
import { User } from "../types";

interface PlayerListProps {
  players: User[];
  sendInvitation: (player: User) => void;
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 500px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const Stars = styled.span`
  font-size: 0.9rem;
  color: #f1c40f;
`;

const InviteButton = styled.button`
  padding: 5px 10px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;

const StatusDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

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

const PlayerList: React.FC<PlayerListProps> = ({ players, sendInvitation }) => {
  return (
    <List>
      {players.map((player) => {
        const statusColor = getStatusColor(player.last_seen_at);
        return (
          <ListItem key={player.id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={player.avatar_url}
                alt={`${player.username}'s avatar`}
              />
              <div>
                <Username>{player.username}</Username>
                <Stars>⭐ {player.stars}</Stars>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <InviteButton onClick={() => sendInvitation(player)}>
                Invite
              </InviteButton>
              <StatusDot color={statusColor} />
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

export default PlayerList;
