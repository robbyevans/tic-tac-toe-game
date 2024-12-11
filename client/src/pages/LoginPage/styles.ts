// src/pages/LoginPage/styles.ts
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
  margin-bottom: 30px;
  font-weight: 800;
  text-align: center;
`;

export const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  animation: ${fadeIn} 0.5s ease forwards;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  padding: 14px 18px;
  border: 1px solid #ccd0d5;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    outline: none;
  }

  &::placeholder {
    color: #a0a5ab;
  }
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

export const Error = styled.p`
  color: #e74c3c;
  font-size: 0.95rem;
  text-align: center;
  margin-top: 10px;
`;
