import { users } from "../index.js";
const sendMsg = (io, socket) => {
    socket.on("message", ({ content, from, to }) => {
        console.log("Message:", content, "From:", from, "To:", to);
        io.to(users[to]).emit("message", { content, from });
    });
}


export { sendMsg };