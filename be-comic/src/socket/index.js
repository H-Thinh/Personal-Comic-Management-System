const Server = require("socket.io").Server;
const chatHandler = require("./chat.socket");

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // hoặc domain frontend của bạn
        },
    });

    io.on("connection", (socket) => {
        console.log(`⚡ Client connected: ${socket.id}`);

        // Gọi từng module xử lý riêng
        chatHandler(io, socket);

        socket.on("disconnect", () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = initSocket;
