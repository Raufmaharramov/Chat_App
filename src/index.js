const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);

app.use(express.static(publicDirectory));
const io = socketio(server);

io.on("connection", socket => {
  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user joined!");

  socket.on("sendMessage", msg => {
    io.emit("message", msg);
  });

  socket.on("sendLocation", obj => {
    io.emit("message", `https://google.com/maps?q=${obj.lat},${obj.long}`);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user disconnected!");
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
