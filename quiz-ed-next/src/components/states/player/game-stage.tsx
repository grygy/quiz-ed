"use client";

import { PlayerStage } from "@/app/[gameId]/page";
import { getPlayer } from "@/game/player-manager";
import { GameState } from "@/models/game-state";

type Props = {
  setStage: (stage: PlayerStage) => void;
  gameState: GameState;
  playerId: string;
};

const GameStage = ({ setStage, gameState, playerId }: Props) => {
  const player = getPlayer(playerId, gameState);

  if (gameState.state === "lobby") {
    return <h3>Hi {player?.name}, sit tight. Others are joining...</h3>;
  }

  return (
    <div>
      <h1>GameStage</h1>
      <button className="btn" onClick={() => setStage("end")}>
        Finish
      </button>
    </div>
  );
};

export default GameStage;
