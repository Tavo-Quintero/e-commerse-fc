// controllers/userController.js
const { User, Shoe, Addresses } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword, isAdmin });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Obtener perfil de usuario
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

// Actualizar perfil de usuario
exports.updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, isAdmin, ban } = req.body;
    try {
        const users = await User.findByPk(id);
        if (users) {
            await users.update({username, email, password, isAdmin, ban});
            res.json({ message: 'users updated successfully', users });
        } else {
            res.status(404).json({ message: 'adress not found' });
        }
    } catch (error) {
        console.error('Error updating Address:', error);
        res.status(500).json({ message: 'Error updating Address', error });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

// Obtener todos los usuarios (solo para admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.getAllUserShoe = async (req, res) => {
    try {
        const users = await User.findAll({ include: { model: Shoe, as: 'shoes' } });
        res.json(users);
    } catch (error) {
        console.error('Error fetching getAllUserShoe:', error.message, error.stack);
        res.status(500).json({ message: 'Error fetching getAllUserShoe' });
    }
};


exports.getAllUserAddresses = async (req, res) => {
    try {
        const users = await User.findAll({ include: { model: Addresses, as: 'addresses' } });
        res.json(users);
    } catch (error) {
        console.error('Error fetching getAllUserAddresses:', error.message, error.stack);
        res.status(500).json({ message: 'Error fetching getAllUserAddresses' });
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
                    await user.addAddress(address, { through: { addressesid: addressId, userid: user.id } });
                } else {
                    throw new Error(`Address with ID ${addressId} not found`);
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
        res.status(500).json({ message: 'Error creating user and associating addresses', error: error.message });
    }
};


exports.updateUserAddress = async (req, res) => {
    const { id } = req.params;
    const { pais, provincia, ciudad, codigopostal, direccion, numberphone } = req.body;
    try {
        const address = await Addresses.findByPk(id);
        if (address) {
            await address.update({ pais, provincia, ciudad, codigopostal, direccion, numberphone });
            res.json(address);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error('Error updating address:', error.message, error.stack);
        res.status(500).json({ message: 'Error updating address' });
    }
};

exports.deleteUserAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await Addresses.findByPk(id);
        if (address) {
            await address.destroy();
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error('Error deleting address:', error.message, error.stack);
        res.status(500).json({ message: 'Error deleting address' });
    }
};