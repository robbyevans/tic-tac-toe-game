// src/styles/styledComponents.ts

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  background: #ffffff;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  box-sizing: border-box;

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
    border-color: #3b5998;
    box-shadow: 0 0 5px rgba(59, 89, 152, 0.5);
    outline: none;
  }

  &::placeholder {
    color: #a0a5ab;
  }
`;

export const Button = styled.button`
  padding: 14px 18px;
  background-color: #4267b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #365899;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #2d4373;
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
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
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
`;

export const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

export const LogoutButton = styled.button`
  margin-left: 15px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export const GameResult = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 20px;
`;
