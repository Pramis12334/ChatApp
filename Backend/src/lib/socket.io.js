const socket = require('socket.io');
const http = require('http');
const express = require('express');
const { socketAuthMiddlewares } = require('../middlewares/socket.auth.middlewares');
const { Server } = require('socket.io');


const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true,
    },
});

io.use(socketAuthMiddlewares);

const userSocketMap = {};

io.on("connection",(socket) => {
    console.log("A user connected", socket.user.username);
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect",() => {
        console.log("A user disconnected", socket.user.username);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

module.exports={
    io,
    app,
    server
};
