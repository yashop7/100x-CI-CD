import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";
const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    client.user.create({
      data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
      },
    }).then(user => {
      ws.send(`User created with ID: ${user.id}`);
    }).catch(err => {
      ws.send(`Error creating user: ${err.message}`);
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:3001");