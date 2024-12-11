// src/pages/LoginPage/LoginPage.tsx
import React from "react";
import * as S from "./styles";
import BackButton from "@src/components/BackButton/BackButton";

interface LoginPageProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  isSubmitting: boolean;
  onLogin: (username: string, pin: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  username,
  setUsername,
  pin,
  setPin,
  error,
  isSubmitting,
  onLogin,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, pin);
  };

  return (
    <S.PageContainer>
      <BackButton />
      <S.PageTitle>Login</S.PageTitle>
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
          <S.Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </S.Button>
          {error && <S.Error>{error}</S.Error>}
        </S.Form>
      </S.Card>
    </S.PageContainer>
  );
};

export default LoginPage;
