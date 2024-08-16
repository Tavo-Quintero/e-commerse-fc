const { MercadoPagoConfig, Preference } = require('mercadopago');
const { v4: uuidv4 } = require('uuid');

const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-6130205937225594-081616-ac10bd897e2f51aa51deea5e5a36aabf-1947871849',
    options: {
        timeout: 5000,
        idempotencyKey: uuidv4(),
    }
});

const preference = new Preference(client)

exports.createOrder = (req, res) => {
    const { items } = req.body;

    // Crear el cuerpo de la solicitud para MercadoPago
    const body = {
        items,
        back_urls: {
            success: "https://pf-henry-trabajofinal.vercel.app/home",
            failure: "https://pf-henry-trabajofinal.vercel.app/home",
            pending: "https://pf-henry-trabajofinal.vercel.app/home"
        },
        auto_return: "approved"
    }

    // Enviar solicitud a MercadoPago
    preference.create({ body })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.error('Payment error:', error);
            res.status(500).json({ error: 'Error creating order' });
        });
};