import { Dispatch } from "react";
import { LatLng } from "react-native-maps";
import { Declaration } from "../../../../model/declaration";
import { DeclarationAction } from "../../../../reducer/declaration-reducer";

export function updateDeclarationDetails(
  declaration: Declaration,
  key: keyof typeof declaration,
  value: string | LatLng,
  carCountryPlate: string,
  socket: WebSocket,
  dispatch: Dispatch<DeclarationAction>,
  webSocketId: number
) {
  dispatch({
    type: "SET_FIELD",
    fieldUpdate: {
      [key]: value,
    },
  });
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        messageType: "exchangeData",
        data: {
          [key]: value,
        },
        roomName: carCountryPlate,
        id: webSocketId,
      })
    );
  }
}
