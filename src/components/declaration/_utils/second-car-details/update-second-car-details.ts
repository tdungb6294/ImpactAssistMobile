import { Dispatch } from "react";
import { Declaration } from "../../../../model/declaration";
import { DeclarationAction } from "../../../../reducer/declaration-reducer";

export function updateSecondCarDetails(
  declaration: Declaration,
  key: keyof typeof declaration.secondCar,
  value: string,
  carCountryPlate: string,
  socket: WebSocket,
  dispatch: Dispatch<DeclarationAction>,
  webSocketId: number
) {
  dispatch({
    type: "SET_FIELD",
    fieldUpdate: {
      secondCar: {
        [key]: value,
      },
    },
  });
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        messageType: "exchangeData",
        data: {
          secondCar: {
            [key]: value,
          },
        },
        roomName: carCountryPlate,
        id: webSocketId,
      })
    );
  }
}
