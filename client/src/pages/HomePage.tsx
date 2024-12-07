// src/pages/HomePage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from "../styles/styledComponents";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
`;

const WelcomeMessage = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 40px;
  max-width: 600px;
`;

const ActionButton = styled(S.Button)`
  margin: 10px;
  width: 200px;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <S.Container>
      <HomeContainer>
        <WelcomeMessage>Welcome to Tic-Tac-Toe Master!</WelcomeMessage>
        <Description>
          Engage in thrilling Tic-Tac-Toe battles against friends or challenge
          yourself against our smart AI. Track your victories and climb the
          leaderboard!
        </Description>
        <div>
          <ActionButton onClick={handleRegister}>Get Started</ActionButton>
          <ActionButton onClick={handleLogin}>Login</ActionButton>
        </div>
      </HomeContainer>
    </S.Container>
  );
};

export default HomePage;
