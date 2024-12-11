// src/pages/GamePage/GamePage.tsx
import { IUser, IGame } from "@src/types";
// src/pages/GamePage/GamePage.tsx
import React from "react";
import * as S from "./styles";
import BackButton from "@src/components/BackButton/BackButton";
import GameBoard from "@src/components/GameBoard/GameBoard";
import PlayAgainModal from "@src/components/PlayAgainModal/PlayAgainModal";

interface GamePageProps {
  user: IUser | null; // Adjust type as needed
  opponent: IUser | null; // Adjust type as needed
  currentGame: IGame | null; // Adjust type as needed
  onMove: (move: number) => void;
  onPlayAgainRequest: () => void;
  onPlayAgainAccept: () => void;
  onPlayAgainDecline: () => void;
  showPlayAgainModal: boolean;
  handleLogout: () => void;
}

const GamePage: React.FC<GamePageProps> = ({
  user,
  opponent,
  currentGame,
  onMove,
  onPlayAgainRequest,
  onPlayAgainAccept,
  onPlayAgainDecline,
  showPlayAgainModal,
  handleLogout,
}) => {
  return (
    <S.PageContainer>
      <S.TopBar>
        <BackButton />
        <S.ProfileSection>
          <S.ProfileIcon
            src={user?.avatar_url || ""}
            alt={`${user?.username}'s avatar`}
          />
          <S.Username>{user?.username}</S.Username>
          <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
        </S.ProfileSection>
        {opponent && (
          <S.OpponentSection>
            <S.OpponentAvatar
              src={opponent.avatar_url || ""}
              alt={`${opponent.username}'s avatar`}
            />
            <S.Username>{opponent.username}</S.Username>
          </S.OpponentSection>
        )}
      </S.TopBar>
      <S.PageTitle>Game</S.PageTitle>
      {currentGame && (
        <GameBoard
          board={currentGame.moves}
          player1Id={currentGame.player1_id}
          onCellClick={onMove}
        />
      )}
      {currentGame?.winner_id && (
        <>
          <S.GameResult>
            {currentGame.winner_id === user?.id ? "You Win!" : "You Lose!"}
          </S.GameResult>
          <S.PlayAgainButton onClick={onPlayAgainRequest}>
            Play Again
          </S.PlayAgainButton>
        </>
      )}
      {showPlayAgainModal && (
        <PlayAgainModal
          onAccept={onPlayAgainAccept}
          onDecline={onPlayAgainDecline}
        />
      )}
    </S.PageContainer>
  );
};

export default GamePage;
