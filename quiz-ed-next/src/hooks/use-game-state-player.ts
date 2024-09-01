import { PlayerStage } from "@/app/[gameId]/page";
import { GAME_STATE_TOPIC } from "@/constants/topic-name";
import { GameState } from "@/models/game-state";
import { GameStatePayload } from "@/models/topic-payload";
import { socket } from "@/socket";
import { Dispatch, SetStateAction, useEffect } from "react";

const useGameStatePlayer = (
  gameId: number,
  setGameState: Dispatch<SetStateAction<GameState | undefined>>,
  handleSetStage: (stage: PlayerStage) => void
) => {
  useEffect(() => {
    socket.on(GAME_STATE_TOPIC, (gameStatePayload: GameStatePayload) => {
      if (gameStatePayload.gameId !== gameId) {
        console.log(
          "Game state received for different game id",
          gameStatePayload.gameId
        );
        return;
      }
      setGameState({ ...gameStatePayload.gameState });
      if (gameStatePayload.gameState.state === "finished") {
        handleSetStage("end");
      }
      if (gameStatePayload.gameState.state === "playing") {
        handleSetStage("game");
      }
      console.log("Game state received");
    });
    return () => {
      socket.off(GAME_STATE_TOPIC);
    };
  }, []);
};

export default useGameStatePlayer;
