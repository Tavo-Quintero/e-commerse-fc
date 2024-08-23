const http = require('http');
const socketIo = require('socket.io');

let io;

module.exports = {
    init: (server) => {
        io = socketIo(server);
        io.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('joinRoom', (userId) => {
                socket.join(userId);
            });

            socket.on('userMessage', (data) => {
                const { userId, message } = data;
                io.to(userId).emit('adminMessage', message);
            });

            socket.on('adminMessage', (data) => {
                const { userId, message } = data;
                io.to(userId).emit('userMessage', message);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
};