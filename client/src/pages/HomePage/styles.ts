// src/pages/HomePage/styles.ts
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #edf0f2, #dcdcdc);
  animation: fadeIn 0.5s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const PageTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 800;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 40px;
  max-width: 600px;
  text-align: center;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

export const Button = styled.button`
  padding: 14px 18px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #1f6391;
    transform: translateY(0);
  }

  &:disabled {
    background-color: #a0a5ab;
    cursor: not-allowed;
  }
`;
