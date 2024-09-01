"use client";

import { PlayerStage } from "@/app/[gameId]/page";
import { emitJoinPlayer } from "@/communication/emitter";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  setStage: (stage: PlayerStage) => void;
  gameId: number;
  visitorId: string;
};

type NameForm = {
  name: string;
};

const UsernameStage = ({ setStage, gameId, visitorId }: Props) => {
  const { register, handleSubmit, formState } = useForm<NameForm>();

  const onSubmit: SubmitHandler<NameForm> = (data) => {
    console.log(data);
    emitJoinPlayer({
      gameId: gameId,
      player: {
        id: visitorId,
        name: data.name,
        score: 0,
      },
    });
    setStage("game");
  };

  return (
    <div>
      <h1>UsernameStage</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-sm"
      >
        <input
          className="input input-bordered"
          {...register("name", {
            minLength: { value: 2, message: "Name needs to be longer" },
          })}
          placeholder="Name"
        />
        {formState.errors.name && (
          <span className="text-error">{formState.errors.name.message}</span>
        )}
        <input className="btn btn-primary" type="submit" value="Join game" />
      </form>
    </div>
  );
};

export default UsernameStage;
