import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import GameBoard from "../components/GameBoard";
import useGame from "../hooks/useGame";
import { useUser } from "../hooks/useUser";
import api from "../utils/api";
import * as S from "../styles/styledComponents";
import { User } from "../types";
import { PageContainer, PageTitle } from "../styles/styledPages";
import styled from "styled-components";
import createCable from "../utils/actionCable";
import { updateGame } from "../slices/gameSlice";
import { FaRedoAlt } from "react-icons/fa";
import BackButton from "../components/BackButton";
import PlayAgainModal from "../components/PlayAgainModal"; // New modal component

const OpponentSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OpponentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const PlayAgainButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentGame, setCurrentGame, updateCurrentGame, clearCurrentGame } =
    useGame();
  const { user, token, logout, fetchUser } = useUser();
  const [opponent, setOpponent] = useState<User | null>(null);
  const dispatch = useDispatch();

  // New state for play-again requests
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
      const cable = createCable(token);
      const subscription = cable.subscriptions.create(
        { channel: "GamesChannel", game_id: currentGame.id },
        {
          received: (data) => {
            if (data.game) {
              dispatch(updateGame(data.game));
            }
            if (data.type === "PLAY_AGAIN_REQUEST") {
              // Opponent requested a rematch
              setShowPlayAgainModal(true);
            }
            if (data.type === "PLAY_AGAIN_ACCEPTED") {
              // Rematch accepted, game should be reset now by the server
              // The updated game is broadcast via data.game
            }
          },
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentGame, token, dispatch]);

  useEffect(() => {
    if (currentGame?.winner_id && currentGame.winner_id === user?.id) {
      // Re-fetch user data to show updated stars
      fetchUser();
    }
  }, [currentGame, user, dispatch]);

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
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
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
    api.post(`/games/${currentGame?.id}/play_again_request`);
  };

  const handlePlayAgainAccept = async () => {
    // When opponent accepts rematch
    try {
      await api.post(`/games/${currentGame?.id}/play_again_accept`);
      setShowPlayAgainModal(false);
    } catch (err) {
      console.error("Error accepting rematch:", err);
    }
  };

  const handlePlayAgainDecline = () => {
    setShowPlayAgainModal(false);
  };

  return (
    <PageContainer>
      <S.TopBar>
        <BackButton />
        <S.ProfileSection>
          <S.ProfileIcon
            src={user?.avatar_url}
            alt={`${user?.username}'s avatar`}
          />
          <S.Username>{user?.username}</S.Username>
          <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
        </S.ProfileSection>
        {opponent && (
          <OpponentSection>
            <OpponentAvatar
              src={opponent.avatar_url}
              alt={`${opponent.username}'s avatar`}
            />
            <S.Username>{opponent.username}</S.Username>
          </OpponentSection>
        )}
      </S.TopBar>
      <PageTitle>Game</PageTitle>
      {currentGame && (
        <GameBoard
          board={currentGame.moves}
          player1Id={currentGame.player1_id}
          onCellClick={handleMove}
        />
      )}
      {currentGame?.winner_id && (
        <>
          <S.GameResult>
            {currentGame.winner_id === user?.id ? "You Win!" : "You Lose!"}
          </S.GameResult>
          <PlayAgainButton onClick={handlePlayAgainRequest}>
            <FaRedoAlt />
            Request Rematch
          </PlayAgainButton>
        </>
      )}
      {showPlayAgainModal && (
        <PlayAgainModal
          onAccept={handlePlayAgainAccept}
          onDecline={handlePlayAgainDecline}
        />
      )}
    </PageContainer>
  );
};

export default GamePage;
