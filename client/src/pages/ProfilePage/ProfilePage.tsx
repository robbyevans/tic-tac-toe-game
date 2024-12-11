// src/pages/ProfilePage/ProfilePage.tsx
import React from "react";
import * as S from "./styles";
import BackButton from "@src/components/BackButton/BackButton";
import { IUser } from "@src/types";
interface ProfilePageProps {
  user: IUser; // Adjust type as needed
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  if (!user) {
    return <S.PageContainer>Loading...</S.PageContainer>;
  }

  return (
    <S.PageContainer>
      <BackButton />
      <S.PageTitle>Your Profile</S.PageTitle>
      <S.ProfileContainer>
        <S.Avatar src={user.avatar_url} alt={`${user.username}'s avatar`} />
        <S.Username>{user.username}</S.Username>
        <S.Stars>⭐ Stars: {user.stars}</S.Stars>
      </S.ProfileContainer>
    </S.PageContainer>
  );
};

export default ProfilePage;
