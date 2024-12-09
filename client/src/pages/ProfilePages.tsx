// src/pages/ProfilePage.tsx
import React from "react";
import { useUser } from "../hooks/useUser";
import styled from "styled-components";
import { PageContainer, PageTitle } from "../styles/styledPages";

const ProfileContainer = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin: 50px auto;
  text-align: center;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const Username = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

const Stars = styled.p`
  font-size: 1.4rem;
  color: #f1c40f;
`;

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PageContainer>
      <PageTitle>Your Profile</PageTitle>
      <ProfileContainer>
        <Avatar src={user.avatar_url} alt={`${user.username}'s avatar`} />
        <Username>{user.username}</Username>
        <Stars>⭐ Stars: {user.stars}</Stars>
      </ProfileContainer>
    </PageContainer>
  );
};

export default ProfilePage;
