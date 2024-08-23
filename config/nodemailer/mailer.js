const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Función para enviar un correo de confirmación de registro
const sendRegistrationConfirmation = (to, username) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Confirmación de Registro',
        text:
            `Hola ${username},\n\nGracias por registrarte en nuestra plataforma. ¡Bienvenido!\n\nSaludos,\nEl equipo`
};

    return transporter.sendMail(mailOptions);
};

// Función para enviar una confirmación de pedido
const sendOrderConfirmation = (to, orderDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Confirmación de Pedido',
        text: `Hola,\n\nTu pedido ha sido confirmado. Aquí están los detalles de tu pedido:\n${orderDetails}\n\nGracias por tu compra.\n\nSaludos,\nEl equipo`
};

    return transporter.sendMail(mailOptions);
};

// Otras funciones para diferentes propósitos pueden ir aquí

module.exports = { sendRegistrationConfirmation, sendOrderConfirmation };