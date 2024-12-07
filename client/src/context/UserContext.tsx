// src/context/UserContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: number;
  username: string;
  avatar_url?: string;
  email: string;
  stars: number;
}

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt_token");
    const savedUser = localStorage.getItem("user");
    console.log("UserContext: Loaded token from localStorage:", savedToken);
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      console.log("UserContext: setToken and setUser successfully");
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt_token", token);
    } else {
      localStorage.removeItem("jwt_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
