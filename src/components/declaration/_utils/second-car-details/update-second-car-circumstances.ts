import { Dispatch, SetStateAction } from "react";
import { Declaration } from "../../../../model/declaration";

export function updateSecondCarCircumstances(
  declaration: Declaration,
  key: keyof typeof declaration.secondCar.circumstances,
  value: string,
  setDeclaration: (value: SetStateAction<Declaration>) => void,
  timeoutId: NodeJS.Timeout | null,
  carCountryPlate: string,
  setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null>>,
  socket: WebSocket
) {
  setDeclaration((prevState: Declaration) => ({
    ...prevState,
    secondCar: {
      ...prevState.secondCar,
      circumstances: {
        ...prevState.secondCar.circumstances,
        [key]: value,
      },
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
              secondCar: {
                circumstances: {
                  [key]: value,
                },
              },
            },
            roomName: carCountryPlate,
          })
        );
      }
    }, 3000)
  );
}
