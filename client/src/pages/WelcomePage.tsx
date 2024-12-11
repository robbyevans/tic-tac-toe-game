// src/pages/WelcomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, PageTitle } from "../styles/styledPages";
import { Button } from "../styles/styledComponents";
import BackButton from "../components/BackButton";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToSinglePlayer = () => {
    navigate("/game/single");
  };

  const goToMultiplayer = () => {
    navigate("/game/multiplayer");
  };

  return (
    <PageContainer>
      <BackButton />
      <PageTitle>Welcome!</PageTitle>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button onClick={goToSinglePlayer}>Single Player</Button>
        <Button onClick={goToMultiplayer}>Multiplayer</Button>
      </div>
    </PageContainer>
  );
};

export default WelcomePage;
