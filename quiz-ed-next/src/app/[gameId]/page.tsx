"use client";

import EndStage from "@/components/states/player/end-stage";
import GameStage from "@/components/states/player/game-stage";
import UsernameStage from "@/components/states/player/username-stage";
import { useState } from "react";

export type PlayerStage = "username" | "game" | "end";

export default function Page({ params }: { params: { gameId: string } }) {
  const [stage, setStage] = useState<PlayerStage>("username");
  const gameId = params.gameId;

  const handleSetStage = (stage: PlayerStage) => {
    setStage(stage);
  };

  return (
    <>
      <div className="">Game id:{gameId}</div>
      {stage === "username" && <UsernameStage setStage={handleSetStage} />}
      {stage === "game" && <GameStage setStage={handleSetStage} />}
      {stage === "end" && <EndStage />}
    </>
  );
}
