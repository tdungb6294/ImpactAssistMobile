import { UseFormSetValue } from "react-hook-form";
import { Declaration } from "../../../../model/declaration";

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

  // Send the update via WebSocket if the connection is open
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        messageType: "exchangeData",
        data: {
          path: path,
          value: value,
        },
        roomName,
        id: webSocketId,
      })
    );
  }
}
