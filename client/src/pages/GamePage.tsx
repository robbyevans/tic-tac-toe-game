// src/pages/GamePage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/styledComponents";
import styled from "styled-components";

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
`;

const OptionButton = styled.button`
  padding: 15px 30px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #1c5980;
    transform: translateY(0);
  }
`;

const GamePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSinglePlayer = () => {
    navigate("/game/single");
  };

  const handleMultiplayer = () => {
    navigate("/game/multiplayer");
  };

  return (
    <S.Container>
      <S.Title>Select Game Mode</S.Title>
      <OptionsContainer>
        <OptionButton onClick={handleSinglePlayer}>Single Player</OptionButton>
        <OptionButton onClick={handleMultiplayer}>Multiplayer</OptionButton>
      </OptionsContainer>
    </S.Container>
  );
};

export default GamePage;
