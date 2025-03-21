import { Dispatch } from "react";
import { Declaration } from "../../../../model/declaration";
import { DeclarationAction } from "../../../../reducer/declaration-reducer";

export function updateFirstCarCarDetails(
  declaration: Declaration,
  key: keyof typeof declaration.firstCar.car,
  value: string,
  carCountryPlate: string,
  socket: WebSocket,
  dispatch: Dispatch<DeclarationAction>,
  webSocketId: number
) {
  dispatch({
    type: "SET_FIELD",
    fieldUpdate: {
      firstCar: {
        car: {
          [key]: value,
        },
      },
    },
  });
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        messageType: "exchangeData",
        data: {
          firstCar: {
            car: {
              [key]: value,
            },
          },
        },
        roomName: carCountryPlate,
        id: webSocketId,
      })
    );
  }
}
