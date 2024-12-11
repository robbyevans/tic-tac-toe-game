// src/containers/LoginPageContainer.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@src/slices/userSlice";
import { useNavigate } from "react-router-dom";
import api from "@src/utils/api";
import LoginPage from "@src/pages/LoginPage/LoginPage";

const LoginPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (username: string, pin: string) => {
    setError(null);

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
        user: { username, pin },
      });

      const { user, token } = response.data;
      dispatch(setUser(user));
      dispatch(setToken(token));
      localStorage.setItem("jwt_token", token);

      navigate("/welcome");
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0] || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginPage
      username={username}
      setUsername={setUsername}
      pin={pin}
      setPin={setPin}
      error={error}
      isSubmitting={isSubmitting}
      onLogin={handleLogin}
    />
  );
};

export default LoginPageContainer;
