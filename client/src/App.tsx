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
import ProtectedRoute from "./components/ProtectedRoute";
import InvitationsListener from "./components/InvitationsListener";

const App: React.FC = () => {
  return (
    <Router>
      <InvitationsListener />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
