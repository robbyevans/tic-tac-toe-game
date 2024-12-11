// src/hooks/useGame.ts

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // Update with the correct path to your store
import { setGame, updateGame, clearGame } from "../slices/gameSlice";
import { Game } from "../types";

export const useGame = () => {
  const dispatch = useDispatch();

  // Access current game state
  const currentGame = useSelector((state: RootState) => state.game.currentGame);

  // Action creators
  const setCurrentGame = (game: Game) => {
    dispatch(setGame(game));
  };

  const updateCurrentGame = (game: Game) => {
    dispatch(updateGame(game));
  };

  const clearCurrentGame = () => {
    dispatch(clearGame());
  };

  return {
    currentGame,
    setCurrentGame,
    updateCurrentGame,
    clearCurrentGame,
  };
};
