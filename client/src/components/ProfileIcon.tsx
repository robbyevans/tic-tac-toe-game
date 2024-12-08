// src/components/ProfileIcon.tsx

import React from "react";
import styled from "styled-components";

interface ProfileIconProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  onLogout?: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: black;
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const ProfileIcon: React.FC<ProfileIconProps> = ({
  avatarUrl,
  username,
  onLogout,
}) => {
  return (
    <Container>
      <Avatar src={avatarUrl} alt={`${username}'s avatar`} />
      <Username>{username}</Username>
      {onLogout && <LogoutButton onClick={onLogout}>Logout</LogoutButton>}
    </Container>
  );
};

export default ProfileIcon;
