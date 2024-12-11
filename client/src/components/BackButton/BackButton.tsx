// src/components/BackButton/BackButton.tsx
import React from "react";
import * as S from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Button onClick={() => navigate(-1)}>
      <FaArrowLeft />
      Back
    </S.Button>
  );
};

export default BackButton;
