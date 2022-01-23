const socket = io();

const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");

socket.on("message", message => {
    outputMsg(message);

    chatWindow.scrollTop = chatWindow.scrollHeight;
});

chatForm.addEventListener("submit", e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit("chat-msg", msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// Output to DOM
function outputMsg(msg) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p>USER <span>3:23pm</span></p>
    <p>${msg}</p>`;
    document.getElementById("chat-window").appendChild(div);
}
