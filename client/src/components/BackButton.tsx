import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

const Button = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #2980b9;
  }
`;

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)}>
      <FaArrowLeft />
      Back
    </Button>
  );
};

export default BackButton;
