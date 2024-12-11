// src/router/AppRouter.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "@src/components/ProtectedRoute/ProtectedRoute";

import HomePageContainer from "@src/containers/HomePageContainer";
import LoginPageContainer from "@src/containers/LoginPageContainer";
import RegisterPageContainer from "@src/containers/RegisterPageContainer";
import WelcomePageContainer from "@src/containers/WelcomePageContainer";
import GamePageContainer from "@src/containers/GamePageContainer";
import SinglePlayerPageContainer from "@src/containers/SinglePlayerPageContainer";
import MultiplayerPageContainer from "@src/containers/MultiplayerPageContainer";
import ProfilePageContainer from "@src/containers/ProfilePageContainer";
import { CableProvider } from "@src/context/CableContext";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <CableProvider>
        <Routes>
          <Route path="/register" element={<RegisterPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePageContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GamePageContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/:id"
            element={
              <ProtectedRoute>
                <GamePageContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/single"
            element={
              <ProtectedRoute>
                <SinglePlayerPageContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/multiplayer"
            element={
              <ProtectedRoute>
                <MultiplayerPageContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePageContainer />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePageContainer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CableProvider>
    </Router>
  );
};

export default AppRouter;
