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
        const { username, email, password, isAdmin, ban, addresses } = req.body;

        // Crear el usuario con los detalles proporcionados
        const user = await User.create({ username, email, password, isAdmin, ban });

        // Asociar las direcciones existentes al usuario
        if (addresses && addresses.length > 0) {
            for (const addressId of addresses) {
                const address = await Addresses.findByPk(addressId);
                if (address) {
                    await user.addAddress(address);
                }
            }
        }

        // Recuperar el usuario con las direcciones asociadas
        const updatedUser = await User.findByPk(user.id, {
            include: {
                model: Addresses,
                as: 'addresses',
                through: { attributes: ['addressesid', 'userid'] }  // Incluye la tabla intermedia
            }
        });

        res.status(201).json(updatedUser);
    } catch (error) {
        console.error('Error creating user and associating addresses:', error.message, error.stack);
        res.status(500).json({ message: 'Error creating user and associating addresses' });
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