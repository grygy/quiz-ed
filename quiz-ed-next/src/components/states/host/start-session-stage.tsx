"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import { GameState } from "@/models/game-state";
import Button from "@kiwicom/orbit-components/lib/Button";

type Props = {
  setStage: (stage: HostStage) => void;
  gameState: GameState;
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void;
};

const StartSessionStage = ({ setStage, gameState, updateGameState }: Props) => {
  return (
    <div>
      <h1>StartSessionStage</h1>
      <div>players:</div>
      {gameState && (
        <div>{gameState?.players.map((player) => player.name).join(", ")}</div>
      )}
      <Button
      // onClick={() => {
      //   updateGameState((gameState) => {
      //     const newGameState: GameState = {
      //       ...gameState,
      //       state: "playing",
      //     };
      //     return newGameState;
      //   });
      //   setStage("hostGame");
      // }}
      >
        Start
      </Button>
    </div>
  );
};

export default StartSessionStage;
