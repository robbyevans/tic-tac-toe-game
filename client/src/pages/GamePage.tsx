import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import GameBoard from "../components/GameBoard";
import useGame from "../hooks/useGame";
import { useUser } from "../hooks/useUser";
import api from "../utils/api";
import * as S from "../styles/styledComponents";
import { User } from "../types";
import { PageContainer, PageTitle } from "../styles/styledPages";
import styled from "styled-components";

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

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentGame, setCurrentGame, updateCurrentGame, clearCurrentGame } =
    useGame();
  const { user, logout } = useUser();
  const [opponent, setOpponent] = useState<User | null>(null);

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

  return (
    <PageContainer>
      <S.TopBar>
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
          // Pass player1_id and player2_id to GameBoard to assign symbols correctly
          player1Id={currentGame.player1_id}
          onCellClick={handleMove}
        />
      )}
      {currentGame?.winner_id && (
        <S.GameResult>
          {currentGame.winner_id === user?.id ? "You Win!" : "You Lose!"}
        </S.GameResult>
      )}
    </PageContainer>
  );
};

export default GamePage;
