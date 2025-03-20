import { Dispatch, SetStateAction } from "react";
import { LatLng } from "react-native-maps";
import { Declaration } from "../../../../model/declaration";

export function updateDeclarationDetails(
  declaration: Declaration,
  key: keyof typeof declaration,
  value: string | LatLng,
  setDeclaration: (value: SetStateAction<Declaration>) => void,
  timeoutId: NodeJS.Timeout | null,
  carCountryPlate: string,
  setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null>>,
  socket: WebSocket
) {
  setDeclaration((prevState: Declaration) => ({
    ...prevState,
    [key]: value,
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
              [key]: value,
            },
            roomName: carCountryPlate,
          })
        );
      }
    }, 3000)
  );
}
