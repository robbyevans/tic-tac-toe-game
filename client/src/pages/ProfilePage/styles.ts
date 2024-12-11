// src/pages/ProfilePage/styles.ts
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #edf0f2, #dcdcdc);
`;

export const PageTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 40px;
  font-weight: 800;
  text-align: center;
`;

export const ProfileContainer = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

export const Username = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

export const Stars = styled.p`
  font-size: 1.4rem;
  color: #f1c40f;
`;
