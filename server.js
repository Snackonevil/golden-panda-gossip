const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = "Ron, the Panda";

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    // emits to user
    socket.emit("message", formatMessage(botName, "Welcome!"));

    // emits to others (not user)
    socket.broadcast.emit(
        "message",
        formatMessage(botName, "Someone has joined")
    );

    // emits to all users
    io.emit();

    socket.on("disconnect", () => {
        io.emit("message", formatMessage(botName, "USER has left"));
    });

    // Listens for 'chat-msg' on client and emits msg
    socket.on("chat-msg", msg => {
        io.emit("message", formatMessage("notRon", msg));
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
