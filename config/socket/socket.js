const { Server } = require('socket.io');

let io;

module.exports = {
    init: (server) => {
        io = new Server(server, {
            cors: {
                origin: 'https://pf-henry-trabajofinal.vercel.app', // Reemplaza con la URL de tu cliente
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        io.on('connection', (socket) => {
            console.log('Usuario conectado');

            // Unirse a la sala específica del usuario
            socket.on('joinRoom', (userId) => {
                socket.join(userId);
                console.log(`Usuario ${userId} se unió a la sala`);
            });

            // Mensajes del usuario
            socket.on('userMessage', (data) => {
                const { userId, message } = data;
                io.to(userId).emit('adminMessage', message); // Enviar mensaje al administrador
                // Aquí puedes guardar el mensaje en la base de datos si es necesario
            });

            // Mensajes del administrador
            socket.on('adminMessage', (data) => {
                const { userId, message } = data;
                io.to(userId).emit('userMessage', message); // Enviar mensaje al usuario
                // Aquí puedes guardar el mensaje en la base de datos si es necesario
            });

            socket.on('disconnect', () => {
                console.log('Usuario desconectado');
            });
        });

        return io;
    },

    getIo: () => {
        if (!io) {
            throw new Error('¡Socket.io no está inicializado!');
        }
        return io;
    }
};