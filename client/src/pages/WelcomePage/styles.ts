// src/pages/WelcomePage/styles.ts
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #edf0f2, #dcdcdc);
  animation: ${fadeIn} 0.5s ease forwards;
`;

export const PageTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 40px;
  font-weight: 800;
  text-align: center;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
`;

export const Button = styled.button`
  padding: 14px 18px;
  background-color: #2ecc71;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #1f8a3e;
    transform: translateY(0);
  }
`;
