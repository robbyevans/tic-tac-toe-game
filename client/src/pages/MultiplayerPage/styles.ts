// src/pages/MultiplayerPage/styles.ts
import styled from "styled-components";

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
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
`;

export const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-bottom: 20px;
`;

export const Error = styled.p`
  color: #e74c3c;
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 10px;
`;
