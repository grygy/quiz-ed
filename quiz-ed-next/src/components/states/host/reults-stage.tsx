"use client";

import { getPlayersOrderedByScore } from "@/game/game-manager";
import { GameState } from "@/models/game-state";

type Props = {
  gameState: GameState;
};

const ResultsStage = ({ gameState }: Props) => {
  const orderedPlayers = getPlayersOrderedByScore(gameState);
  return (
    <div>
      <h1>ResultsStage</h1>
      <div>Results:</div>
      {orderedPlayers.map((player) => (
        <div key={player.id}>
          {player.name} - {player.score}
        </div>
      ))}
    </div>
  );
};

export default ResultsStage;
