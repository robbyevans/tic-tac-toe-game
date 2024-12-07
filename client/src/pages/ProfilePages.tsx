// src/pages/ProfilePage.tsx

import React from "react";
import { useUser } from "../context/UserContext";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 50px auto;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Username = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

const Stars = styled.p`
  font-size: 1.2rem;
  color: #f1c40f;
`;

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <Avatar src={user.avatar_url} alt={`${user.username}'s avatar`} />
      <Username>{user.username}</Username>
      <Stars>⭐ Stars: {user.stars}</Stars>
    </ProfileContainer>
  );
};

export default ProfilePage;
