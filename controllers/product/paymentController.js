const { MercadoPagoConfig, Payment } = require('mercadopago');
const { v4: uuidv4 } = require('uuid');

const client = new MercadoPagoConfig({
    accessToken: 'TEST-5761146775875634-081211-ace83aa01b7e884ada2d7a96e62932f0-1010031640',
    options: {
        timeout: 5000,
        idempotencyKey: uuidv4(),
    }
});

const payment = new Payment(client);

exports.createOrder = (req, res) => {
    const { transaction_amount, description, payment_method_id, payer, token } = req.body;

    // Verificar que el token está presente
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    // Crear el cuerpo de la solicitud para MercadoPago
    const body = {
        transaction_amount,
        description,
        payment_method_id,
        payer,
        token // Asegúrate de incluir el token
    };

    // Enviar solicitud a MercadoPago
    payment.create({ body })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.error('Payment error:', error);
            res.status(500).json({ error: 'Error creating order' });
        });
};