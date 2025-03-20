import { Dispatch, SetStateAction } from "react";
import { Declaration } from "../../../../model/declaration";

export function updateFirstCarDetails(
  declaration: Declaration,
  key: keyof typeof declaration.firstCar,
  value: string,
  setDeclaration: (value: SetStateAction<Declaration>) => void,
  timeoutId: NodeJS.Timeout | null,
  carCountryPlate: string,
  setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null>>,
  socket: WebSocket
) {
  setDeclaration((prevState: Declaration) => ({
    ...prevState,
    firstCar: {
      ...prevState.firstCar,
      [key]: value,
    },
  }));
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  setTimeoutId(
    setTimeout(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            messageType: "exchangeData",
            data: {
              firstCar: {
                [key]: value,
              },
            },
            roomName: carCountryPlate,
          })
        );
      }
    }, 3000)
  );
}
