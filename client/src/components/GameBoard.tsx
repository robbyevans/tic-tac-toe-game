import React from "react";
import styled from "styled-components";

interface Move {
  player_id: number;
  move: number;
}

interface GameBoardProps {
  board: Move[] | null;
  onCellClick: (move: number) => void;
  player1Id: number | null;
}

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 120px);
  gap: 10px;
  margin-top: 20px;
  background: #f5f2e9;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #ddd;
`;

const Cell = styled.div`
  background-color: #ffffff;
  border: 2px solid #333333;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #fafafa;
    transform: scale(1.05);
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
  }

  &:active {
    background-color: #f0f0f0;
    transform: scale(1);
  }
`;

const Symbol = styled.span<{ player: "X" | "O" }>`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => (props.player === "X" ? "#3498db" : "#e74c3c")};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

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
    <Board>
      {displayBoard.map((cell, index) => (
        <Cell key={index} onClick={() => handleClick(index)}>
          {cell && <Symbol player={cell as "X" | "O"}>{cell}</Symbol>}
        </Cell>
      ))}
    </Board>
  );
};

export default GameBoard;
