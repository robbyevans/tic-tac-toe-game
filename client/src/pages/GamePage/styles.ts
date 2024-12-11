// src/pages/GamePage/styles.ts
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f0e8, #e8e4d8);
`;

export const PageTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: 800;
  text-align: center;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
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

export const OpponentSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const OpponentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const GameResult = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 20px;
`;

export const PlayAgainButton = styled.button`
  margin-top: 20px;
  padding: 14px 20px;
  background-color: #2ecc71;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;
