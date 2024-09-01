import { GameState } from "@/models/game-state";
import { useMemo } from "react";
import useStoreState from "./use-store-state";

const useGameState = (gameId: number) => {
  const [gameState, setGameState] = useStoreState(
    "game-state",
    JSON.stringify({
      gameId: gameId,
      players: [],
    })
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

  return [parsedGameState, updateGameState] as const;
};

export default useGameState;
