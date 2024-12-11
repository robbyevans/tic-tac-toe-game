// src/containers/ProfilePageContainer.tsx
import React from "react";
import ProfilePage from "@src/pages/ProfilePage/ProfilePage";
import { useUser } from "@src/hooks/useUser";

const ProfilePageContainer: React.FC = () => {
  const { user } = useUser();

  return <ProfilePage user={user} />;
};

export default ProfilePageContainer;
