const {Order, Shoe, User} = require("../../models");

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

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Order' });
    }
};

exports.createOrder = async (req, res) => {
    const { statuspago, statusenvio, fecha, total } = req.body;
    try {
        const newOrder = await Order.create({ statuspago, statusenvio, fecha, total });
        res.status(201).json(newOrder);

    } catch (error) {
        res.status(500).json({ message: 'Error creating Order', error });
    }
};

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const {  statuspago, statusenvio, fecha, total } = req.body;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            await order.update({ statuspago, statusenvio, fecha, total });
            res.json({ message: 'Order updated successfully', order });

        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Order', error });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            await order.destroy();
            res.json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Order', error });
    }
};

exports.createOrdershoe = async (req, res) => {
    try {
        const { statuspago, statusenvio, fecha, total, shoes } = req.body;

        console.log('Datos recibidos:', { statuspago, statusenvio, fecha, total, shoes });

        const order = await Order.create({ statuspago, statusenvio, fecha, total });
        console.log('Orden creada:', order);

        if (shoes && shoes.length > 0) {
            const shoesInstances = await Shoe.findAll({ where: { id: shoes } });
            console.log('Zapatos encontrados:', shoesInstances);
            await order.setShoes(shoesInstances);
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Error al crear usuario y asociar zapatos:', error);
        res.status(500).json({ message: 'Error creando usuario y asociando zapatos', error: error.message });
    }
};