// src/styles/styledPages.ts
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f0e8, #e8e4d8);
  animation: ${fadeIn} 0.5s ease forwards;
`;

export const PageTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 30px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  font-weight: 800;
  text-align: center;
`;

export const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  animation: ${fadeIn} 0.5s ease forwards;
  margin-bottom: 20px;
`;

export const CenteredContent = styled.div`
  text-align: center;
`;

export const StyledDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 40px;
  max-width: 600px;
  text-align: center;
`;
