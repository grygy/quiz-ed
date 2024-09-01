import { JOIN_PLAYER_TOPIC } from "@/constants/topic-name";
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
        return {
          gameId: state.gameId,
          players: [...state.players, playerPayload.player],
        };
      });

      console.log("player joined", playerPayload);
    };

    socket.on(JOIN_PLAYER_TOPIC, (playerPayload: JoinPlayerPayload) => {
      handleAddPlayer(playerPayload);
    });
    return () => {
      socket.off(JOIN_PLAYER_TOPIC);
    };
  }, []);
};

export default useJoinPlayer;
