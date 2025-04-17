import { debounce } from "lodash";

export function createDebouncedWebSocketSender(
  socket: WebSocket,
  delay: number = 300
) {
  const sendMessage = (message: any) => {
    if (socket && socket.readyState && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return debounce(sendMessage, delay);
}
