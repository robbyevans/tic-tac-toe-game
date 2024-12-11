// src/components/GameBoard/GameBoard.tsx
import React from "react";
import * as S from "./styles";

interface Move {
  player_id: number;
  move: number;
}

interface GameBoardProps {
  board: Move[] | null;
  onCellClick: (move: number) => void;
  player1Id: number | null;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  player1Id,
}) => {
  const displayBoard = Array(9).fill(null);

  if (board) {
    board.forEach((move) => {
      const symbol = move.player_id === player1Id ? "X" : "O";
      displayBoard[move.move] = symbol;
    });
  }

  const handleClick = (index: number) => {
    if (!displayBoard[index]) {
      onCellClick(index);
    }
  };

  return (
    <S.Board>
      {displayBoard.map((cell, index) => (
        <S.Cell key={index} onClick={() => handleClick(index)}>
          {cell && <S.Symbol player={cell as "X" | "O"}>{cell}</S.Symbol>}
        </S.Cell>
      ))}
    </S.Board>
  );
};

export default GameBoard;
