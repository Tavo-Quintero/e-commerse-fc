const {Addresses, User} = require('../../models');

exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.findAll({ include: { model: User, as: 'users' } });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Addresses' });
    }
};

exports.createAddress = async (req, res) => {
    const { pais, provincia, ciudad, codigopostal, direccion, numberphone, userid } = req.body;
    try {
        console.log('Datos recibidos para crear dirección:', { pais, provincia, ciudad, codigopostal, direccion, numberphone, userid });

        // Crear la dirección
        const newAddress = await Addresses.create({ pais, provincia, ciudad, codigopostal, direccion, numberphone });
        console.log('Dirección creada:', newAddress);

        // Asociar el usuario a la dirección
        await newAddress.addUser(userid);
        console.log('Usuario asociado a la dirección:', userid);

        res.status(201).json(newAddress);
    } catch (error) {
        console.error('Error al crear la dirección:', error);
        res.status(500).json({
            message: 'Error creating Address',
            error: error.message
        });
    }
};



exports.updateAddress = async (req, res) => {
    const { id } = req.params;
    const { pais, provincia, ciudad, codigopostal, direccion, numberphone } = req.body;
    try {
        const address = await Addresses.findByPk(id);
        if (address) {
            await address.update({ pais, provincia, ciudad, codigopostal, direccion, numberphone });
            res.json({ message: 'Address updated successfully', address });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error('Error updating Address:', error);
        res.status(500).json({ message: 'Error updating Address', error });
    }
};
exports.deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await Addresses.findByPk(id);
        if (address) {
            await address.destroy();
            res.json({ message: 'Address deleted successfully' });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Address' });
    }
};