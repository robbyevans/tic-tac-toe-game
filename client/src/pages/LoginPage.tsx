// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../hooks/useUser";
import { setUser, setToken } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import * as S from "../styles/styledComponents";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useUser();
  if (isAuthenticated) {
    console.log("isAuthenticated", isAuthenticated);
    navigate("/game");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!username || !pin) {
      setError("Username and PIN are required.");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/login", {
        user: {
          username,
          pin,
        },
      });

      const { user, token } = response.data;
      dispatch(setUser(user));
      dispatch(setToken(token));

      // **Store the token in Local Storage**
      localStorage.setItem("jwt_token", token);

      navigate("/game");
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0] || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.Title>Login</S.Title>
      <S.Form onSubmit={handleLogin}>
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
    </S.Container>
  );
};

export default LoginPage;
