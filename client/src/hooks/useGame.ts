// src/hooks/useGame.ts

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setGame, updateGame, clearGame } from "../slices/gameSlice";
import { IGame } from "../types";

export const useGame = () => {
  const dispatch = useDispatch();

  // Access current game state
  const currentGame = useSelector((state: RootState) => state.game.currentGame);

  // Action creators
  const setCurrentGame = (game: IGame) => {
    dispatch(setGame(game));
  };

  const updateCurrentGame = (game: IGame) => {
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
