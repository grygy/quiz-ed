import { PLAYER_ANSWER_TOPIC } from "@/constants/topic-name";
import { addAnswerForQuestion } from "@/game/player-manager";
import { GameState } from "@/models/game-state";
import { PlayerAnswerPayload } from "@/models/topic-payload";
import { socket } from "@/socket";
import { useEffect } from "react";

const usePlayerAnswer = (
  gameId: number,
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void
) => {
  useEffect(() => {
    const handlePlayerAnswer = (playerAnswerPayload: PlayerAnswerPayload) => {
      if (playerAnswerPayload.gameId !== gameId) {
        console.log("player joined wrong game", playerAnswerPayload);
      }

      updateGameState((state) => {
        const newGameState = addAnswerForQuestion(
          playerAnswerPayload.questionId,
          playerAnswerPayload.answer,
          state
        );
        return newGameState;
      });

      console.log("Player answered", playerAnswerPayload);
    };

    socket.on(
      PLAYER_ANSWER_TOPIC,
      (playerAnswerPayload: PlayerAnswerPayload) => {
        handlePlayerAnswer(playerAnswerPayload);
      }
    );
    return () => {
      socket.off(PLAYER_ANSWER_TOPIC);
    };
  }, [gameId, updateGameState]);
};

export default usePlayerAnswer;
