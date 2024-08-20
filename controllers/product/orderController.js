const {Order, Shoe} = require("../../models");

exports.getAllOrdershoe = async (req, res) => {
    try {
        const order = await Order.findAll({ include: { model: Shoe, as: 'shoes' } });
        res.json(order);
    } catch (error) {
        console.error('Error fetching getAllOrdershoe:', error.message, error.stack);
        res.status(500).json({ message: 'Error fetching getAllOrdershoe' });
    }
};

exports.getAllOrder = async (req, res) => {
    try {
        const order = await Order.findAll();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Order' });
    }
};