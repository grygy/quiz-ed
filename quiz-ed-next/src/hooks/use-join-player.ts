import { JOIN_PLAYER_TOPIC } from "@/constants/topic-name";
import { addOrUpdatePlayer } from "@/game/player-manager";
import { GameState } from "@/models/game-state";
import { JoinPlayerPayload } from "@/models/topic-payload";
import { socket } from "@/socket";
import { useEffect } from "react";

const useJoinPlayer = (
  gameId: number,
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void
) => {
  useEffect(() => {
    const handleAddPlayer = (playerPayload: JoinPlayerPayload) => {
      if (playerPayload.gameId !== gameId) {
        console.log("player joined wrong game", playerPayload);
      }

      updateGameState((state) => {
        const newGameState = addOrUpdatePlayer(playerPayload.player, state);
        return newGameState;
      });

      console.log("player joined", playerPayload);
    };

    socket.on(JOIN_PLAYER_TOPIC, (playerPayload: JoinPlayerPayload) => {
      handleAddPlayer(playerPayload);
    });
    return () => {
      socket.off(JOIN_PLAYER_TOPIC);
    };
  }, [gameId, updateGameState]);
};

export default useJoinPlayer;
