// src/styles/styledComponents.ts
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f0e8, #e8e4d8);
  animation: ${fadeIn} 0.5s ease forwards;
`;

export const Title = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 30px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  font-weight: 800;
`;

export const Form = styled.form`
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.5s ease forwards;
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

export const WaitingMessage = styled.p`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-top: 20px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px;
  background: #fdfdfd;
  border-bottom: 1px solid #e9ecef;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

export const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

export const LogoutButton = styled.button`
  margin-left: 15px;
  padding: 6px 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #c0392b;
  }
`;

export const GameResult = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 20px;
  animation: ${fadeIn} 0.3s ease;
`;
