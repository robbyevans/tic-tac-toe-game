// src/containers/WelcomePageContainer.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomePage from "@src/pages/WelcomePage/WelcomePage";
import { useUser } from "@src/hooks/useUser";

const WelcomePageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const goToSinglePlayer = () => navigate("/game/single");
  const goToMultiplayer = () => navigate("/game/multiplayer");

  return (
    <WelcomePage
      onSinglePlayer={goToSinglePlayer}
      onMultiplayer={goToMultiplayer}
      logout={logout}
    />
  );
};

export default WelcomePageContainer;
