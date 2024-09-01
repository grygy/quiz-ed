"use client";

import EndStage from "@/components/states/player/end-stage";
import GameStage from "@/components/states/player/game-stage";
import UsernameStage from "@/components/states/player/username-stage";
import useConnectionLogs from "@/hooks/use-connection-logs";
import useStoreState from "@/hooks/use-store-state";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export type PlayerStage = "username" | "game" | "end";

export default function Page({ params }: { params: { gameId: string } }) {
  const [stage, setStage] = useState<PlayerStage>("username");
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

  if (!gameId || !isClient || !visitorId) {
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
      {stage === "game" && <GameStage setStage={handleSetStage} />}
      {stage === "end" && <EndStage />}
    </>
  );
}
