import { UseFormSetValue } from "react-hook-form";
import { Declaration } from "../../../../model/declaration";
import { createDebouncedWebSocketSender } from "../../../../utils/websocket-utils";

// Create the debounced sender once and reuse it
let debouncedSender: ReturnType<typeof createDebouncedWebSocketSender>;

export function updateDeclarationField<
  T extends Declaration[keyof Declaration]
>(
  path: keyof Declaration,
  value: T,
  roomName: string,
  socket: WebSocket,
  setValue: UseFormSetValue<Declaration>,
  webSocketId: number
) {
  setValue(path, value);

  if (!debouncedSender) {
    debouncedSender = createDebouncedWebSocketSender(socket);
  }

  debouncedSender({
    messageType: "exchangeData",
    data: {
      path: path,
      value: value,
    },
    roomName,
    id: webSocketId,
  });
}
