import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const host = process.env.HOST_NAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname: host, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      console.log(`user connected: ${socket.id}`);

      socket.on("message", ({ message, sender, room }) => {
        console.log(`Message from ${sender} in room ${room}: ${message}`);
        socket.to(room).emit("message", { sender, message });
      });

      socket.on("join-room", ({ room, username }) => {
        socket.join(room);
        console.log(`User ${username} joined room ${room}`);

        socket.emit("join-room", `You joined room ${room}`);
        socket.to(room).emit("user-joined", `${username} joined the room`);
      });

      socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
      });
    });

    httpServer.listen(port, () => {
      console.log(`Server running on http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error preparing Next.js app:", err);
  });
