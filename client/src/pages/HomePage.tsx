// src/pages/HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/styledComponents";
import {
  PageContainer,
  PageTitle,
  StyledDescription,
} from "../styles/styledPages";
import styled from "styled-components";
import BackButton from "../components/BackButton";

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
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
    <PageContainer>
      <BackButton/>
      <PageTitle>Welcome to Tic-Tac-Toe Master!</PageTitle>
      <StyledDescription>
        Engage in thrilling Tic-Tac-Toe battles against friends or challenge
        yourself against our AI. Track your victories and climb the leaderboard!
      </StyledDescription>
      <ActionButtons>
        <S.Button onClick={handleRegister}>Get Started</S.Button>
        <S.Button onClick={handleLogin}>Login</S.Button>
      </ActionButtons>
    </PageContainer>
  );
};

export default HomePage;
