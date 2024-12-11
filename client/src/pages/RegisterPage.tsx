// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import * as S from "../styles/styledComponents";
import AvatarSelector from "../components/AvatorSelector";
import { PageContainer, PageTitle, Card } from "../styles/styledPages";
import BackButton from "../components/BackButton";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
    <PageContainer>
      <BackButton />
      <PageTitle>Register</PageTitle>
      <Card>
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
      </Card>
    </PageContainer>
  );
};

export default RegisterPage;
