const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 9000 });

const rooms = new Map();

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    if (data.messageType === "joinRoom") {
      const roomName = data.data.firstCar.car.carCountryPlate;
      if (!rooms.has(roomName)) {
        rooms.set(roomName, { connections: [ws] });
        ws.roomName = roomName;

        ///log
        const room = rooms.get(roomName);
        console.log(
          "Client connected to room:",
          roomName,
          room.connections.length
        );
      } else if (
        rooms.has(roomName) &&
        rooms.get(roomName).connections.length === 1
      ) {
        const room = rooms.get(roomName);

        room.connections.push(ws);
        ws.roomName = roomName;

        ///log
        console.log(
          "Client connected to room:",
          roomName,
          room.connections.length
        );
      }
    } else if (data.messageType === "exchangeData") {
      const roomName = data.roomName;
      const room = rooms.get(roomName);
      room.connections.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
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
          rooms.delete(ws.roomName);
        }
      }
    }
  });
});

console.log("WebSocket server running on ws://localhost:9000");
