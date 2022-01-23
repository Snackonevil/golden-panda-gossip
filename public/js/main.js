const socket = io();

socket.on("message", message => {
    console.log(message);
});

$("#chat-form").on("submit", e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit("chat-msg", msg);
});
