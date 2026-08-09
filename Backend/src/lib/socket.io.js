import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { socketAuthMiddlewares } from '../middlewares/socket.auth.middlewares.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true,
    },
});

io.use(socketAuthMiddlewares);

const userSocketMap = {};

const getReceiverSocketId = (userId) => {
    return userSocketMap[userId] || null;
};

io.on('connection', (socket) => {
    console.log('A user connected', socket.user.username);
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.user.username);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { io, app, server, getReceiverSocketId };
export default { io, app, server, getReceiverSocketId };
