const nodemailer = require('nodemailer');

// Configurar el transportador con credenciales de Gmail directamente en el código
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cirosendgridprueba@gmail.com', // Aquí pones tu correo electrónico
        pass: 'Ciroshopsport180385' // Aquí pones tu contraseña
    }
});

// Función para enviar un correo de confirmación de registro
const sendRegistrationConfirmation = (to, username) => {
    const mailOptions = {
        from: 'cirosendgridprueba@gmail.com', // El mismo correo que usas para enviar
        to,
        subject: 'Confirmación de Registro',
        text: `Hola ${username},\n\nGracias por registrarte en nuestra plataforma. ¡Bienvenido!\n\nSaludos,\nEl equipo`
    };

    return transporter.sendMail(mailOptions);
};

// Función para enviar una confirmación de pedido
const sendOrderConfirmation = (to, orderDetails) => {
    const mailOptions = {
        from: 'cirosendgridprueba@gmail.com', // El mismo correo que usas para enviar
        to,
        subject: 'Confirmación de Pedido',
        text: `Hola,\n\nTu pedido ha sido confirmado. Aquí están los detalles de tu pedido:\n${orderDetails}\n\nGracias por tu compra.\n\nSaludos,\nEl equipo`
    };

    return transporter.sendMail(mailOptions);
};

// Exportar las funciones para uso en otras partes de la aplicación
module.exports = {
    sendRegistrationConfirmation,
    sendOrderConfirmation
};
