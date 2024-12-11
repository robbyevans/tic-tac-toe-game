// src/pages/RegisterPage/RegisterPage.tsx
import React from "react";
import * as S from "./styles";
import BackButton from "@src/components/BackButton/BackButton";
import AvatarSelector from "@src/components/AvatarSelector/AvatarSelector";

interface RegisterPageProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  avatar: File | null;
  setAvatar: React.Dispatch<React.SetStateAction<File | null>>;
  error: string | null;
  isSubmitting: boolean;
  onRegister: (
    username: string,
    pin: string,
    email: string,
    password: string,
    avatar: File | null
  ) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  username,
  setUsername,
  pin,
  setPin,
  email,
  setEmail,
  password,
  setPassword,
  avatar,
  setAvatar,
  error,
  isSubmitting,
  onRegister,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, pin, email, password, avatar);
  };

  return (
    <S.PageContainer>
      <BackButton />
      <S.PageTitle>Register</S.PageTitle>
      <S.Card>
        <S.Form onSubmit={handleSubmit}>
          <S.Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <S.Input
            type="password"
            placeholder="4-Digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            maxLength={4}
            minLength={4}
            pattern="\d{4}"
            title="Enter exactly 4 digits."
          />
          <S.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <S.Input
            type="password"
            placeholder="Password (min 4 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />
          <AvatarSelector
            selectedAvatar={avatar}
            setSelectedAvatar={setAvatar}
          />
          <S.Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </S.Button>
          {error && <S.Error>{error}</S.Error>}
        </S.Form>
      </S.Card>
    </S.PageContainer>
  );
};

export default RegisterPage;
