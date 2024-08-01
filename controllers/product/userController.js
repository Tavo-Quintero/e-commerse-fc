const { User } = require('../../models');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Crear nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        // Verifica si todos los campos requeridos están presentes
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Crea el nuevo usuario
        const newUser = await User.create({ username, email, password, isAdmin });

        // Envía la respuesta con el usuario creado
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error); // Añade esto para ver detalles del error en la consola
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ username, email, password, isAdmin });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

