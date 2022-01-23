const socket = io();

socket.on("message", message => {
    outputMsg(message);
});

$("#chat-form").on("submit", e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit("chat-msg", msg);
});

// Output to DOM
function outputMsg(msg) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p>${msg}</p>`;
    document.getElementById("chat-window").appendChild(div);
}
