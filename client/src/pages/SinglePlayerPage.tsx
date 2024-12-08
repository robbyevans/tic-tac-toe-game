// src/pages/SinglePlayerPage.tsx

import React, { useState, useEffect } from "react";
import SinglePlayerGameBoard from "../components/SinglePlayerGameBoard"; // Updated import
import * as S from "../styles/styledComponents";
import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import ProfileIcon from "../components/ProfileIcon";

type Player = "X" | "O";
type CellValue = Player | null;

const Result = styled.p`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-top: 20px;
`;

const SinglePlayerPage: React.FC = () => {
  const { user, logout } = useUser();
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<CellValue>(null);

  const handleMove = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const detectedWinner = checkWinner(newBoard);
    if (detectedWinner) {
      setWinner(detectedWinner);
      setGameOver(true);
      return;
    }

    if (!newBoard.includes(null)) {
      setGameOver(true);
      return;
    }

    // Switch to AI
    setCurrentPlayer("O");
  };

  useEffect(() => {
    if (currentPlayer === "O" && !gameOver) {
      // Simple AI: Choose a random empty cell
      const emptyIndices = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((index) => index !== null) as number[];

      if (emptyIndices.length > 0) {
        const randomIndex =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        setTimeout(() => {
          handleAIMove(randomIndex);
        }, 500); // Delay for realism
      }
    }
  }, [currentPlayer, gameOver]);

  const handleAIMove = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "O";
    setBoard(newBoard);

    const detectedWinner = checkWinner(newBoard);
    if (detectedWinner) {
      setWinner(detectedWinner);
      setGameOver(true);
      return;
    }

    if (!newBoard.includes(null)) {
      setGameOver(true);
      return;
    }

    // Switch back to user
    setCurrentPlayer("X");
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

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
      <S.Title>Single Player</S.Title>
      <SinglePlayerGameBoard board={board} onCellClick={handleMove} />
      {gameOver && (
        <Result>
          {winner ? (winner === "X" ? "You Win!" : "AI Wins!") : "It's a Draw!"}
        </Result>
      )}
      {gameOver && <S.Button onClick={handleReset}>Play Again</S.Button>}
    </S.Container>
  );
};

// Simple check winner function
function checkWinner(board: CellValue[]): CellValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default SinglePlayerPage;
