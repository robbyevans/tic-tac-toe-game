// src/containers/GamePageContainer.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import GamePage from "@src/pages/GamePage/GamePage";
import { useGame } from "@src/hooks/useGame";
import { useUser } from "@src/hooks/useUser";
import api from "@src/utils/api";
import getCable from "@src/utils/actionCable";
import { updateGame } from "@src/slices/gameSlice";
import type { IUser } from "@src/types";
import { isAxiosError } from "axios";

const GamePageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentGame, setCurrentGame, updateCurrentGame, clearCurrentGame } =
    useGame();
  const { user, token, logout, fetchUser } = useUser();
  const [opponent, setOpponent] = useState<IUser | null>(null);
  const dispatch = useDispatch();

  const [showPlayAgainModal, setShowPlayAgainModal] = useState(false);

  useEffect(() => {
    if (!currentGame && id) {
      api
        .get(`/games/${id}`)
        .then((response) => {
          setCurrentGame(response.data.game);
        })
        .catch((err) => {
          console.error("Error fetching game:", err);
          navigate("/game/multiplayer");
        });
    }
  }, [currentGame, id, navigate, setCurrentGame]);

  useEffect(() => {
    if (currentGame) {
      const opponentId =
        currentGame.player1_id === user?.id
          ? currentGame.player2_id
          : currentGame.player1_id;

      if (opponentId) {
        api.get(`/users/${opponentId}`).then((response) => {
          setOpponent(response.data);
        });
      }
    }
  }, [currentGame, user]);

  useEffect(() => {
    if (currentGame && token) {
      const cable = getCable(token); // Use singleton consumer
      const subscription = cable.subscriptions.create(
        { channel: "GamesChannel", game_id: currentGame.id },
        {
          received: (data) => {
            if (data.game) {
              dispatch(updateGame(data.game));
            }
            if (data.type === "PLAY_AGAIN_REQUEST") {
              setShowPlayAgainModal(true);
            }
            if (data.type === "PLAY_AGAIN_ACCEPTED") {
              dispatch(updateGame(data.game));
              // Handle accepted rematch if needed
            }
          },
        }
      );

      return () => {
        subscription.unsubscribe();
        // Do not disconnect the cable here
        // cable.disconnect(); // Remove this line
      };
    }
  }, [currentGame, token, dispatch]);

  useEffect(() => {
    if (currentGame?.winner_id && currentGame.winner_id === user?.id) {
      // Re-fetch user data to show updated stars
      fetchUser();
    }
  }, [currentGame, user, fetchUser]);

  const handleMove = async (move: number) => {
    if (
      currentGame &&
      currentGame.status === "ongoing" &&
      !currentGame.winner_id
    ) {
      try {
        const response = await api.put(`/games/${currentGame.id}/move`, {
          move,
        });
        updateCurrentGame(response.data.game);
      } catch (err: any) {
        if (isAxiosError(err)) {
          // Use isAxiosError directly
          console.error("Error making move:", err);
          alert(err.response?.data?.errors?.[0] || "Failed to make move.");
        } else {
          console.error("An unexpected error occurred:", err);
          alert("An unexpected error occurred.");
        }
      }
    }
  };

  const handleLogout = () => {
    clearCurrentGame();
    logout();
    navigate("/login");
  };

  const handlePlayAgainRequest = () => {
    // Send a request to the server to initiate a rematch request
    if (currentGame?.id) {
      api.post(`/games/${currentGame.id}/play_again_request`);
    }
  };

  const handlePlayAgainAccept = async () => {
    if (currentGame?.id) {
      try {
        await api.post(`/games/${currentGame.id}/play_again_accept`);
        setShowPlayAgainModal(false);
        clearCurrentGame();
      } catch (err) {
        console.error("Error accepting rematch:", err);
      }
    }
  };

  const handlePlayAgainDecline = () => {
    setShowPlayAgainModal(false);
    clearCurrentGame();
  };

  return (
    <GamePage
      user={user}
      opponent={opponent}
      currentGame={currentGame}
      onMove={handleMove}
      onPlayAgainRequest={handlePlayAgainRequest}
      onPlayAgainAccept={handlePlayAgainAccept}
      onPlayAgainDecline={handlePlayAgainDecline}
      showPlayAgainModal={showPlayAgainModal}
      handleLogout={handleLogout}
    />
  );
};

export default GamePageContainer;
