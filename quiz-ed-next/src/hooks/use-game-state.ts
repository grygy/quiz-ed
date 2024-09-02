import { GameState } from "@/models/game-state";
import { useMemo } from "react";
import useStoreState from "./use-store-state";

const useGameState = (gameId: number) => {
  const BASE_GAME_STATE: GameState = {
    gameId: gameId,
    players: [],
    currentQuestionIndex: 0,
    questions: [],
    quizTitle: "",
    state: "lobby",
    questionState: "reading",
  };

  const [gameState, setGameState] = useStoreState(
    "game-state",
    JSON.stringify(BASE_GAME_STATE)
  );

  const updateGameState = (
    setGameStateCallback: (gameState: GameState) => void
  ) => {
    const parsedGameState = JSON.parse(gameState!) as GameState;
    const newState = setGameStateCallback(parsedGameState);
    setGameState(JSON.stringify(newState));
  };

  const parsedGameState = useMemo(() => {
    if (!gameState) {
      return undefined;
    }
    return JSON.parse(gameState!) as GameState;
  }, [gameState]);

  const clearGame = () => {
    setGameState(JSON.stringify(BASE_GAME_STATE));
  };

  return { gameState: parsedGameState, updateGameState, clearGame };
};

export default useGameState;
