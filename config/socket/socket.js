const socketIo = require('socket.io');

let io;

module.exports = {
    init: (server) => {
        io = socketIo(server, {
            cors: {
                origin: "https://e-commerse-fc.onrender.com",
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket) => {
            console.log('New client connected');

            // Unirse a la sala específica del usuario
            socket.on('joinRoom', (userId) => {
                socket.join(userId);
                console.log(`User ${userId} joined room`);
            });

            // Mensajes del usuario
            socket.on('userMessage', (data) => {
                const { userId, message } = data;
                io.to(userId).emit('adminMessage', message); // Enviar mensaje al administrador
                // Guarda el mensaje en la base de datos si es necesario
            });

            // Mensajes del administrador
            socket.on('adminMessage', (data) => {
                const { userId, message } = data;
                io.to(userId).emit('userMessage', message); // Enviar mensaje al usuario
                // Guarda el mensaje en la base de datos si es necesario
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