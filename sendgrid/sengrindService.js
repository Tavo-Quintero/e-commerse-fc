const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Configura tu clave de API de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    try {
        const msg = {
            to,
            from: 'teachercirope@gmail.com', // Tu dirección de correo electrónico de SendGrid
            subject,
            text,
            html,
        };
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendEmail,
};