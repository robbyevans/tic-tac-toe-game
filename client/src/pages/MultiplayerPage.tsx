// src/pages/MultiplayerPage.tsx

import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import api from "../utils/api";
import * as S from "../styles/styledComponents";
import PlayerList from "../components/PlayerList";
import InvitationModal from "../components/InvitationModal";
import GameBoard from "../components/GameBoard";
import { useNavigate } from "react-router-dom";
import createCable from "../utils/actionCable"; // Updated import

interface Game {
  id: number;
  player1_id: number;
  player2_id: number;
  winner_id: number | null;
  status: string;
  moves: Array<{ player_id: number; move: number }>;
}

interface User {
  id: number;
  username: string;
  avatar_url?: string;
  stars: number;
}

const MultiplayerPage: React.FC = () => {
  const { user, token } = useUser();
  const [availablePlayers, setAvailablePlayers] = useState<User[]>([]);
  const [invitation, setInvitation] = useState<any>(null);
  const [game, setGame] = useState<Game | null>(null);
  const navigate = useNavigate();
  const [cable, setCable] = useState<any>(null);

  useEffect(() => {
    if (token) {
      console.log("MultiplayerPage: token is present in UserContext:", token);
      fetchAvailablePlayers();

      // **Initialize ActionCable with token**
      const newCable = createCable(token);
      setCable(newCable);
    } else {
      console.log("MultiplayerPage: token is NOT present in UserContext");
    }
  }, [token]);

  useEffect(() => {
    if (!cable) return;

    // Subscribe to InvitationsChannel
    const invitationsSubscription = cable.subscriptions.create(
      { channel: "InvitationsChannel" },
      {
        received: (data: any) => {
          setInvitation(data.invitation);
        },
      }
    );

    // Subscribe to GamesChannel when a game is active
    let gamesSubscription: any = null;
    if (game) {
      gamesSubscription = cable.subscriptions.create(
        { channel: "GamesChannel", game_id: game.id },
        {
          received: (data: any) => {
            setGame(data.game);
            if (data.game.winner_id) {
              // Optionally, redirect to profile or display a message
              navigate("/profile");
            }
          },
        }
      );
    }

    return () => {
      cable.subscriptions.remove(invitationsSubscription);
      if (gamesSubscription) {
        cable.subscriptions.remove(gamesSubscription);
      }
    };
  }, [cable, game, navigate]);

  const fetchAvailablePlayers = async () => {
    const tokenFromLS = localStorage.getItem("jwt_token");
    console.log("fetchAvailablePlayers: token from localStorage:", tokenFromLS);
    try {
      const response = await api.get("/players/available");
      console.log("fetchAvailablePlayers: response:", response);
      setAvailablePlayers(response.data);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  const sendInvitation = async (player: User) => {
    try {
      await api.post("/invitations", { receiver_id: player.id });
      // Optionally, show a message indicating invitation sent
    } catch (err: any) {
      console.error("Error sending invitation:", err);
      // Optionally, display error to the user
    }
  };

  const acceptInvitation = async () => {
    if (invitation) {
      try {
        const response = await api.put(`/invitations/${invitation.id}`, {
          status: "accepted",
        });
        setGame(response.data.game);
        setInvitation(null);
      } catch (err: any) {
        console.error("Error accepting invitation:", err);
      }
    }
  };

  const declineInvitation = async () => {
    if (invitation) {
      try {
        await api.put(`/invitations/${invitation.id}`, { status: "declined" });
        setInvitation(null);
      } catch (err: any) {
        console.error("Error declining invitation:", err);
      }
    }
  };

  const handleGameMove = async (move: number) => {
    if (game && game.status === "ongoing" && !game.winner_id) {
      try {
        await api.put(`/games/${game.id}/move`, { move });
      } catch (err: any) {
        console.error("Error making move:", err);
      }
    }
  };

  return (
    <S.Container>
      <S.Title>Multiplayer</S.Title>
      {!game && (
        <>
          <PlayerList
            players={availablePlayers}
            sendInvitation={sendInvitation}
          />
          <S.WaitingMessage>Waiting for a player to join...</S.WaitingMessage>
        </>
      )}
      {game && (
        <GameBoard
          board={game.moves}
          onCellClick={handleGameMove}
          currentUserId={user?.id || 0}
        />
      )}
      {invitation && (
        <InvitationModal
          sender={invitation.sender}
          acceptInvitation={acceptInvitation}
          declineInvitation={declineInvitation}
        />
      )}
    </S.Container>
  );
};

export default MultiplayerPage;
