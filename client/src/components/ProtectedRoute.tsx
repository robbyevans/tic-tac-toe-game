// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
