// src/pages/SinglePlayerPage/SinglePlayerPage.tsx
import React from "react";
import * as S from "./styles";
import BackButton from "@src/components/BackButton/BackButton";
import SinglePlayerGameBoard from "@src/components/SinglePlayerGameBoard/SinglePlayerGameBoard";
import { TPlayerSymbol } from "@src/components/SinglePlayerGameBoard/SinglePlayerGameBoard";
interface SinglePlayerPageProps {
  avatarUrl: string | undefined;
  username: string | undefined;
  logout: () => void;
  board: TPlayerSymbol[];
  onCellClick: (index: number) => void;
  gameOver: boolean;
  winner: string | null;
  onReset: () => void;
}

const SinglePlayerPage: React.FC<SinglePlayerPageProps> = ({
  avatarUrl,
  username,
  logout,
  board,
  onCellClick,
  gameOver,
  winner,
  onReset,
}) => {
  return (
    <S.PageContainer>
      <BackButton />
      <S.TopBar>
        <S.ProfileSection>
          <S.ProfileIcon src={avatarUrl || ""} alt={`${username}'s avatar`} />
          <S.Username>{username}</S.Username>
          <S.LogoutButton onClick={logout}>Logout</S.LogoutButton>
        </S.ProfileSection>
      </S.TopBar>
      <S.PageTitle>Single Player</S.PageTitle>
      <SinglePlayerGameBoard board={board} onCellClick={onCellClick} />
      {gameOver && (
        <S.Result>
          {winner ? (winner === "X" ? "You Win!" : "AI Wins!") : "It's a Draw!"}
        </S.Result>
      )}
      {gameOver && <S.Button onClick={onReset}>Play Again</S.Button>}
    </S.PageContainer>
  );
};

export default SinglePlayerPage;
