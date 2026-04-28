const rooms = new Set();
const messageCache = new Map();

const chatHandler = (io, socket) => {
    socket.on("create_room", (roomId) => {
        rooms.add(roomId);
        console.log(`Room ${roomId} created`);
        messageCache.set(roomId, { members: [], messages: [] });
        console.log("Tạo phòng mới " + messageCache.get(roomId));

    });

    socket.on("get_rooms", () => {
        socket.emit("room_list", Array.from(rooms));
    });

    socket.on("join_room", (roomId) => {
        if (!rooms.has(roomId)) {
            console.log(`Room ${roomId} does not exist`);
            return;
        }
        const members = messageCache.get(roomId).members;

        console.log("Current members in room", members);
        if (members && members.length >= 2) {
            socket.emit("room_full", roomId);
            console.log(`Phòng ${roomId} đã đủ người`);
            return;
        }

        socket.emit("joined_room", messageCache.get(roomId).messages);
        messageCache.get(roomId).members.push(socket.id);
        socket.join(roomId);
        console.log(`${socket.id} đã vào phòng ${roomId}`);
    });

    socket.on("leave_room", (roomId) => {
        console.log("Trước " + messageCache.get(roomId).members);

        socket.leave(roomId);
        const members = messageCache.get(roomId).members;
        messageCache.get(roomId).members = members.filter(id => id !== socket.id);
        console.log("Sau " + messageCache.get(roomId).members);

        console.log(`${socket.id} đã rời phòng ${roomId}`);
    });

    socket.on("send_message", ({ roomId, role, message }) => {
        if (!rooms.has(roomId)) {
            console.log(`Room ${roomId} does not exist`);
            return;
        }

        messageCache.get(roomId).messages.push({ role, message });

        io.to(roomId).emit("receive_message", { role, message });
    });

    socket.on("delete_room", (roomId) => {
        if (!rooms.has(roomId)) {
            console.log(`Phòng ${roomId} không tồn tại`);
            return;
        }

        rooms.delete(roomId);
        messageCache.delete(roomId);

    });
};

module.exports = chatHandler;
