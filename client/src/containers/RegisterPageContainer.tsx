// src/containers/RegisterPageContainer.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@src/slices/userSlice";
import { useNavigate } from "react-router-dom";
import api from "@src/utils/api";
import RegisterPage from "@src/pages/RegisterPage/RegisterPage";

const RegisterPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (
    username: string,
    pin: string,
    email: string,
    password: string,
    avatar: File | null
  ) => {
    setError(null);

    if (!username || !pin || !email || !password) {
      setError("All fields except avatar are required.");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("user[username]", username);
      formData.append("user[pin]", pin);
      formData.append("user[email]", email);
      formData.append("user[password]", password);
      if (avatar) {
        formData.append("user[avatar]", avatar);
      }

      const response = await api.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { user, token } = response.data;
      dispatch(setUser(user));
      dispatch(setToken(token));
      localStorage.setItem("jwt_token", token);

      navigate("/welcome");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join(", "));
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterPage
      username={username}
      setUsername={setUsername}
      pin={pin}
      setPin={setPin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      avatar={avatar}
      setAvatar={setAvatar}
      error={error}
      isSubmitting={isSubmitting}
      onRegister={handleRegister}
    />
  );
};

export default RegisterPageContainer;
