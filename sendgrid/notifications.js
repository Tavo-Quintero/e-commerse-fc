const sgMail = require('./sendgridConfig');

// Función para enviar notificación de confirmación de registro
const sendRegistrationConfirmation = async (email, username) => {
    const msg = {
        to: email,
        from: 'teachercirope@gmail.com',
        subject: 'Bienvenido a ShopSport',
        text: `hola ${username}, gracias por registrarte en ShopSport. ¡Estamos felices de tenerte con nosotros!`,
        html:` <p>Hola ${userName},</p><p>Gracias por registrarte en ShopSport. ¡Estamos felices de tenerte con nosotros!</p>`,
};

    try {
        await sgMail.send(msg);
        console.log('Correo de confirmación enviado.');
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
    }
};

// Exportar todas las funciones
module.exports = {
    sendRegistrationConfirmation,
};