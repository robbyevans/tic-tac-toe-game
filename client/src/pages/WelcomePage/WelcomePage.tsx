// src/pages/WelcomePage/WelcomePage.tsx
import React from "react";
import * as S from "./styles";
import BackButton from "@src/components/BackButton/BackButton";

interface WelcomePageProps {
  onSinglePlayer: () => void;
  onMultiplayer: () => void;
  logout: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
  onSinglePlayer,
  onMultiplayer,
}) => {
  return (
    <S.PageContainer>
      <BackButton />
      <S.PageTitle>Welcome!</S.PageTitle>
      <S.ActionButtons>
        <S.Button onClick={onSinglePlayer}>Single Player</S.Button>
        <S.Button onClick={onMultiplayer}>Multiplayer</S.Button>
      </S.ActionButtons>
    </S.PageContainer>
  );
};

export default WelcomePage;
