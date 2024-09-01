import { emitGameState } from "@/communication/emitter";
import { GAME_STATE_UPDATE_INTERVAL_MS } from "@/constants/communication";
import { GameState } from "@/models/game-state";
import { useEffect } from "react";

const useGameUpdate = (gameId: number, gameState: GameState | undefined) => {
  useEffect(() => {
    const interval = setInterval(() => {
      emitGameState(gameId, gameState);
    }, GAME_STATE_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [gameId, gameState]);
};
export default useGameUpdate;
