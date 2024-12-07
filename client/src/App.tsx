// src/App.tsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";
import SinglePlayerPage from "./pages/SinglePlayerPage";
import MultiplayerPage from "./pages/MultiplayerPage";
import ProfilePage from "./pages/ProfilePages";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/single"
            element={
              <ProtectedRoute>
                <SinglePlayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/multiplayer"
            element={
              <ProtectedRoute>
                <MultiplayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Root Route */}
          <Route path="/" element={<HomePage />} />

          {/* Fallback Route for Undefined Paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
