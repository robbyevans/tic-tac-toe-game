// src/pages/HomePage/HomePage.tsx
import React from "react";
import * as S from "./styles";

interface HomePageProps {
  onRegister: () => void;
  onLogin: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRegister, onLogin }) => {
  return (
    <S.PageContainer>
      <S.PageTitle>Welcome to Tic-Tac-Toe Master!</S.PageTitle>
      <S.Description>
        Engage in thrilling Tic-Tac-Toe battles against friends or challenge
        yourself against our AI. Track your victories and climb the leaderboard!
      </S.Description>
      <S.ActionButtons>
        <S.Button onClick={onRegister}>Get Started</S.Button>
        <S.Button onClick={onLogin}>Login</S.Button>
      </S.ActionButtons>
    </S.PageContainer>
  );
};

export default HomePage;
