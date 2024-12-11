// src/components/ProfileCard/ProfileCard.tsx
import React from "react";
import * as S from "./styles";

interface ProfileCardProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  onLogout?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  username,
  onLogout,
}) => {
  return (
    <S.Container>
      <S.Avatar src={avatarUrl} alt={`${username}'s avatar`} />
      <S.Username>{username}</S.Username>
      {onLogout && <S.LogoutButton onClick={onLogout}>Logout</S.LogoutButton>}
    </S.Container>
  );
};

export default ProfileCard;
