import { Dispatch } from "react";
import { Declaration } from "../../../../model/declaration";
import { DeclarationAction } from "../../../../reducer/declaration-reducer";

export function updateFirstCarInsuranceDetails(
  declaration: Declaration,
  key: keyof typeof declaration.firstCar.insurance,
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
        insurance: {
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
            insurance: {
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
