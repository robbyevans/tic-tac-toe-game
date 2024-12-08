// src/components/GameBoard.tsx

import React from "react";
import styled from "styled-components";

interface Move {
  player_id: number;
  move: number;
}

interface GameBoardProps {
  board: Move[] | null;
  onCellClick: (move: number) => void;
  currentUserId: number;
}

type PlayerSymbol = "X" | "O" | null;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(3, 80px);
    gap: 8px;
  }
`;

const Cell = styled.div`
  background-color: #ffffff;
  border: 2px solid #333333;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
  }

  &:active {
    background-color: #e0e0e0;
    transform: scale(1);
  }
`;

const Symbol = styled.span<{ player: "X" | "O" }>`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => (props.player === "X" ? "#3498db" : "#e74c3c")};
`;

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  currentUserId,
}) => {
  const displayBoard: PlayerSymbol[] = Array(9).fill(null);

  if (board) {
    board.forEach((move) => {
      const symbol = move.player_id === currentUserId ? "X" : "O";
      displayBoard[move.move] = symbol;
    });
  }

  const handleClick = (index: number) => {
    if (!displayBoard[index]) {
      onCellClick(index);
    }
  };

  return (
    <Board>
      {displayBoard.map((cell, index) => (
        <Cell key={index} onClick={() => handleClick(index)}>
          {cell && <Symbol player={cell}>{cell}</Symbol>}
        </Cell>
      ))}
    </Board>
  );
};

export default GameBoard;
