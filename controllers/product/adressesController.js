const {Addresses} = require('../../models');

exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.findAll();
        res.json(addresses);
    } catch (error) {
        console.error('Error fetching getAllAddresses:', error.message, error.stack);
        res.status(500).json({ message: 'Error fetching getAllAddresses' });
    }
};
exports.createUserAddress = async (req, res) => {
    try {
        const { userid, pais, provincia, ciudad, codigopostal, direccion, numberphone } = req.body;

        // Verificar si el usuario existe
        const user = await User.findByPk(userid);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Crear la nueva dirección
        const address = await Addresses.create({ pais, provincia, ciudad, codigopostal, direccion, numberphone });

        // Asociar la nueva dirección al usuario
        await user.addAddress(address);

        // Actualizar el usuario con las nuevas direcciones
        const updatedUser = await User.findByPk(userid, {
            include: { model: Addresses, as: 'addresses' }
        });

        res.status(201).json(updatedUser);
    } catch (error) {
        console.error('Error creating address:', error.message, error.stack);
        res.status(500).json({ message: 'Error creating address' });
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