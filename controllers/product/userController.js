// controllers/userController.js
const { User, Shoe, Addresses, Order} = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { username, email, password, isAdmin, preference }  = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword, isAdmin, preference });
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
    const { username, email, password, isAdmin, ban, preference } = req.body;
    try {
        const users = await User.findByPk(id);
        if (users) {
            await users.update({username, email, password, isAdmin, ban, preference});
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
        console.error('Error creating user and associating addresses:', error.errors || error.message, error.stack);
        res.status(500).json({ message: 'Error creating user and associating addresses', error: error.errors || error.message });
    }
};

exports.createUserAddress = async (req, res) => {
    try {
        const { username, email, password, isAdmin, ban,addresses, preference} = req.body;

        console.log('Datos recibidos:', { username, email, password, isAdmin, ban, addresses,preference });

        const users = await User.create({ username, email, password, isAdmin, ban, preference });
        console.log('userAadress addresses creado:', users);

        if (addresses && addresses.length > 0) {
            const addressesInstances = await Addresses.findAll({ where: { id: addresses, } });
            console.log('Tallas encontradas:', addressesInstances);

            await users.setAddresses(addressesInstances);
            console.log('Tallas asociadas al userAadress');
        }

        res.status(201).json(users);
    } catch (error) {
        console.error('Error al crear userAadress:', error);
        res.status(500).json({ message: 'Error creating userAadress', error: error.message });
    }
};

exports.createAddressUser = async (req, res) => {
    try {
        const { pais, provincia, ciudad, codigopostal, direccion, numberphone, users} = req.body;

        console.log('Datos recibidos:', { pais, provincia, ciudad, codigopostal, direccion, numberphone, users });

        const addresses = await Addresses.create({ pais, provincia, ciudad, codigopostal, direccion, numberphone });
        console.log('userAadress addresses creado:', addresses);

        if (users && users.length > 0) {
            const usersInstances = await User.findAll({ where: { id: users, } });
            console.log('Tallas encontradas:', usersInstances);

            await addresses.setUser(usersInstances);
            console.log('Tallas asociadas al userAadress');
        }

        res.status(201).json(addresses);
    } catch (error) {
        console.error('Error al crear userAadress:', error);
        res.status(500).json({ message: 'Error creating userAadress', error: error.message });
    }
};

exports.createUsershoe = async (req, res) => {
    try {
        const { username, email, password, isAdmin, ban, shoes, preference } = req.body;

        console.log('Datos recibidos:', { username, email, password, isAdmin, ban, shoes, preference });

        const user = await User.create({ username, email, password, isAdmin, ban, preference });
        console.log('Usuario creado:', user);

        if (shoes && shoes.length > 0) {
            const shoesInstances = await Shoe.findAll({ where: { id: shoes } });
            console.log('Zapatos encontrados:', shoesInstances);
            await user.setShoes(shoesInstances);
        }

        res.status(201).json(user);
    } catch (error) {
        console.error('Error al crear usuario y asociar zapatos:', error);
        res.status(500).json({ message: 'Error creando usuario y asociando zapatos', error: error.message });
    }
};

exports.deleteUsersshoe = async (req, res) => {
    try {
        console.log('Attempting to delete shoe with ID:', req.params.id);
        const users = await User.findByPk(req.params.id);
        if (!users) {
            console.log('Shoe not found');
            return res.status(404).json({ message: 'Shoe not found' });
        }
        await users.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting shoe:', error);
        res.status(500).json({ message: 'Error deleting shoe', error: error.message });
    }
};
