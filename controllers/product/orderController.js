const {Order, Shoe} = require("../../models");

exports.getAllOrder = async (req, res) => {
    try {
        const order = await Order.findAll({ include: { model: Shoe, as: 'shoes' } });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoes' });
    }
};

exports.getAllOrder = async (req, res) => {
    try {
        const order = await Order.findAll();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Addresses' });
    }
};