const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const e = require("express");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    // emits to user
    socket.emit("message", "Welcome USER");

    // emits to others (not user)
    socket.broadcast.emit("message", "someone has joined");

    // emits to all users
    io.emit();

    socket.on("disconnect", () => {
        io.emit("message", "a USER has left");
    });

    socket.on("chat-msg", msg => {
        io.emit("message", msg);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
