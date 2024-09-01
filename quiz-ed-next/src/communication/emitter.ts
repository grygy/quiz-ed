import { JOIN_PLAYER_TOPIC } from "@/constants/topic-name";
import { JoinPlayerPayload } from "@/models/topic-payload";
import { socket } from "@/socket";

export const emitJoinPlayer = (playerPayload: JoinPlayerPayload) => {
  socket.emit(JOIN_PLAYER_TOPIC, playerPayload);
  console.log("Player emitted", playerPayload);
};
