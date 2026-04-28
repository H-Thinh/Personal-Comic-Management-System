const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const initSocket = require('./socket/index');

const app = express();
const server = http.createServer(app);

initSocket(server);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

// 🔹 Chạy server (Express + Socket.IO)
server.listen(process.env.PORT, () => {
    console.log(`✅ Server chạy tại: http://localhost:${process.env.PORT}`);
});
