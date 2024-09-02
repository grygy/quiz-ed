"use client";

import EndStage from "@/components/states/player/end-stage";
import GameStage from "@/components/states/player/game-stage";
import UsernameStage from "@/components/states/player/username-stage";
import useConnectionLogs from "@/hooks/use-connection-logs";
import useGameStatePlayer from "@/hooks/use-game-state-player";
import useStoreState from "@/hooks/use-store-state";
import { GameState } from "@/models/game-state";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export type PlayerStage = "username" | "game" | "end";

export default function Page({ params }: { params: { gameId: string } }) {
  const [stage, setStage] = useState<PlayerStage>("username");
  const [gameState, setGameState] = useState<GameState | undefined>();
  const [isClient, setIsClient] = useState(false);
  const [visitorId, _] = useStoreState("visitor-id", v4());
  const gameId = +params.gameId;

  useEffect(() => {
    // to prevent hydration errors
    setIsClient(true);
  }, []);

  useConnectionLogs();

  const handleSetStage = (stage: PlayerStage) => {
    setStage(stage);
  };

  useGameStatePlayer(gameId, setGameState, handleSetStage);

  if (!gameId || !isClient || !visitorId || !gameState) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <>
      <div className="">Game id:{gameId}</div>
      {stage === "username" && (
        <UsernameStage
          setStage={handleSetStage}
          gameId={gameId}
          visitorId={visitorId}
        />
      )}
      {stage === "game" && (
        <GameStage gameState={gameState} playerId={visitorId} />
      )}
      {stage === "end" && <EndStage />}
    </>
  );
}
