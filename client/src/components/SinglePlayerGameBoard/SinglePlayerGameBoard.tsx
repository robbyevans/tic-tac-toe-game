// src/components/SinglePlayerGameBoard/SinglePlayerGameBoard.tsx
import React from "react";
import * as S from "./styles";

export type TPlayerSymbol = "X" | "O" | null;

interface SinglePlayerGameBoardProps {
  board: TPlayerSymbol[];
  onCellClick: (move: number) => void;
}

const SinglePlayerGameBoard: React.FC<SinglePlayerGameBoardProps> = ({
  board,
  onCellClick,
}) => {
  const handleClick = (index: number) => {
    if (!board[index]) {
      onCellClick(index);
    }
  };

  return (
    <S.Board>
      {board.map((cell, index) => (
        <S.Cell key={index} onClick={() => handleClick(index)}>
          {cell && <S.Symbol player={cell}>{cell}</S.Symbol>}
        </S.Cell>
      ))}
    </S.Board>
  );
};

export default SinglePlayerGameBoard;
