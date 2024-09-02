"use client";

import { getPlayerRank, getPlayerScore } from "@/game/game-manager";
import { GameState } from "@/models/game-state";

type Props = {
  gameState: GameState;
  playerId: string;
};

const EndStage = ({ gameState, playerId }: Props) => {
  const rank = getPlayerRank(gameState, playerId);
  const score = getPlayerScore(gameState, playerId);

  return (
    <div>
      <h1>EndStage</h1>
      <div>Your score: {score}</div>
      <div>Your rank: {rank}</div>
    </div>
  );
};

export default EndStage;
