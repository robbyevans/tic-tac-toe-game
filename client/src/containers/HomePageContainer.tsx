// src/containers/HomePageContainer.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "@src/pages/HomePage/HomePage";

const HomePageContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => navigate("/register");
  const handleLogin = () => navigate("/login");

  return <HomePage onRegister={handleRegister} onLogin={handleLogin} />;
};

export default HomePageContainer;
