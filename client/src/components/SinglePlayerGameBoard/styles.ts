// src/components/SinglePlayerGameBoard/styles.ts
import styled from "styled-components";

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 120px);
  gap: 10px;
  margin-top: 20px;
  background: #f5f2e9;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #ddd;

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(3, 80px);
    gap: 8px;
  }
`;

export const Cell = styled.div`
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

export const Symbol = styled.span<{ player: "X" | "O" }>`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => (props.player === "X" ? "#3498db" : "#e74c3c")};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;
