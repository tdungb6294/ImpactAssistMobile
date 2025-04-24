const WebSocket = require("ws");

const ROOM_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

const wss = new WebSocket.Server({ port: 9999 });

function setRoomExpiration(roomName) {
  const room = rooms.get(roomName);
  if (!room) return;

  // Clear any existing timeout
  if (room.expirationTimeout) {
    clearTimeout(room.expirationTimeout);
  }

  // Set new expiration
  room.expirationTimeout = setTimeout(() => {
    console.log(`Room expired: ${roomName}`);
    room.connections.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            messageType: "roomExpired",
            message: `Room ${roomName} has expired due to inactivity.`,
          })
        );
        client.close();
      }
    });

    rooms.delete(roomName);
  }, ROOM_TIMEOUT_MS);
}

const rooms = new Map();

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    if (data.messageType === "joinRoom") {
      const roomName = data.data.firstCar.car.carCountryPlate;
      if (!rooms.has(roomName)) {
        ws.id = 1;
        ws.roomName = roomName;
        rooms.set(roomName, { connections: [ws] });

        ///log
        const room = rooms.get(roomName);
        console.log(
          "Client connected to room:",
          roomName,
          room.connections.length
        );
        ws.send(JSON.stringify({ messageType: "exchangeId", id: 1 }));
        setRoomExpiration(roomName);
      } else if (
        rooms.has(roomName) &&
        rooms.get(roomName).connections.length === 1
      ) {
        const room = rooms.get(roomName);

        ws.id = 2;
        ws.roomName = roomName;
        room.connections.push(ws);

        ///log
        console.log(
          "Client connected to room:",
          roomName,
          room.connections.length
        );
        ws.send(JSON.stringify({ messageType: "exchangeId", id: 2 }));
      }
    } else if (data.messageType === "exchangeData") {
      const roomName = data.roomName;
      const room = rooms.get(roomName);
      room.connections.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && data.id !== client.id) {
          client.send(JSON.stringify(data));
        }
      });
      setRoomExpiration(roomName);
    } else if (data.messageType === "exchangeImage") {
      const roomName = data.roomName;
      const room = rooms.get(roomName);
      room.connections.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && data.id !== client.id) {
          client.send(JSON.stringify(data));
        }
      });
      setRoomExpiration(roomName);
    }
  });

  ws.on("close", () => {
    if (ws.roomName) {
      const room = rooms.get(ws.roomName);
      if (room) {
        // Remove the client from the room
        const index = room.connections.indexOf(ws);
        if (index !== -1) {
          room.connections.splice(index, 1);
        }

        // Notify remaining clients in the room
        if (room.connections.length > 0) {
          room.connections.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  message: `A client has disconnected from room: ${ws.roomName}`,
                })
              );
              console.log("disconnected", ws.roomName, room.connections.length);
            }
          });
        }

        // If the room is empty, delete it
        if (room.connections.length === 0) {
          clearTimeout(room.expirationTimeout);
          rooms.delete(ws.roomName);
        }
      }
    }
  });
});

console.log("WebSocket server running on ws://localhost:9000");
