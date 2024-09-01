import { socket } from "@/socket";
import { useEffect } from "react";

const useConnectionLogs = () => {
  useEffect(() => {
    const onConnect = () => {
      console.log("Connected to server");

      socket.io.engine.on("upgrade", (transport) => {
        console.log("transport", transport);
      });
    };

    const onDisconnect = () => {
      console.log("Disconnected from server");
    };

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
};

export default useConnectionLogs;
