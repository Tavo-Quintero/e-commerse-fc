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

// Función para enviar notificación de nueva orden
const sendOrderConfirmation = async (email, Shoe) => {
    const msg = {
        to: userEmail,
        from: 'teachercirope@gmail.com',
        subject: 'Confirmación de tu Orden',
        text: `Hola, tu orden con el ID ${orderDetails.id} ha sido confirmada. Detalles: ${orderDetails.details}`,
        html: `<p>Hola,</p><p>Tu orden con el ID ${orderDetails.id} ha sido confirmada.</p><p>Detalles:</p><p>${orderDetails.details}</p>`,
    };
};

    try {
        await sgMail.send(msg);
        console.log('Correo de confirmación de orden enviado.');
    } catch (error) {
        console.error('Error al enviar el correo de confirmación de orden:', error);
};


// Exportar todas las funciones
module.exports = {
    sendRegistrationConfirmation,
    sendOrderConfirmation,

};