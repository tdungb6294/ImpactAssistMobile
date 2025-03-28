import { Dispatch } from "react";
import { Declaration } from "../../../../model/declaration";
import { DeclarationAction } from "../../../../reducer/declaration-reducer";

export function updateFirstCarDriverDetails(
  declaration: Declaration,
  key: keyof typeof declaration.firstCar.driver,
  value: string | Date,
  carCountryPlate: string,
  socket: WebSocket,
  dispatch: Dispatch<DeclarationAction>,
  webSocketId: number
) {
  dispatch({
    type: "SET_FIELD",
    fieldUpdate: {
      firstCar: {
        driver: {
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
            driver: {
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
