// src/components/LoadingSpinner.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${spin} 0.8s linear infinite;
  margin: 20px auto;
`;

const LoadingSpinner: React.FC = () => <Spinner />;

export default LoadingSpinner;
