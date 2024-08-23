const {Addresses, User} = require('../../models');

exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.findAll();
        res.json(addresses);
    } catch (error) {
        console.error('Error fetching getAllAddresses:', error.message, error.stack);
        res.status(500).json({ message: 'Error fetching getAllAddresses' });
    }
};
exports.createAddress = async (req, res) => {
    const { pais, provincia, ciudad, codigopostal, direccion, numberphone, userid } = req.body;
    try {
        // Crear la nueva dirección
        const newAddress = await Addresses.create({ pais, provincia, ciudad, codigopostal, direccion, numberphone });

        // Asociar la dirección con el usuario
        await newAddress.addUser(userid);

        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Address' });
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