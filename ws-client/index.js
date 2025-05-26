const socket = new WebSocket("ws://localhost:9000");

socket.onopen = () => {
  console.log("Connected to WebSocket server");

  // Create a new room
  socket.send(
    JSON.stringify({
      messageType: "joinRoom",
      data: { firstCar: { car: { carCountryPlate: "MDU" } } },
    })
  );
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received:", JSON.stringify(data));
};
