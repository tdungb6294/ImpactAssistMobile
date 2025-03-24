import { Dispatch } from "react";
import { DeclarationAction } from "../../../../reducer/declaration-reducer";

export function updateDeclarationField<T>(
  path: string[],
  value: T,
  roomName: string,
  socket: WebSocket,
  dispatch: Dispatch<DeclarationAction>,
  webSocketId: number
) {
  // Build the nested object dynamically
  const fieldUpdate = path.reduceRight<{ [key: string]: any }>(
    (acc, key) => ({ [key]: acc }),
    value as { [key: string]: any }
  );

  // Dispatch the update
  dispatch({
    type: "SET_FIELD",
    fieldUpdate,
  });

  // Send the update via WebSocket if the connection is open
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        messageType: "exchangeData",
        data: fieldUpdate,
        roomName,
        id: webSocketId,
      })
    );
  }
}
