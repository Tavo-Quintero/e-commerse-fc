const { Size } = require('../../models');

// Obtener todas las tallas
exports.getAllSizes = async (req, res) => {
    try {
        const sizes = await Size.findAll();
        res.json(sizes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sizes' });
    }
};

// Obtener una talla por su ID
exports.getSizeById = async (req, res) => {
    try {
        const size = await Size.findByPk(req.params.id);
        if (!size) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.json(size);
    } catch (error) {
        console.error('Error fetching size:', error);
        res.status(500).json({ message: 'Error fetching size', error: error.message });
    }
};

// Crear una nueva talla
exports.createSize = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { value } = req.body;
        if (!value) {
            return res.status(400).json({ message: 'Size value is required' });
        }
        const size = await Size.create({ value });
        console.log('Size created:', size);
        res.status(201).json(size);
    } catch (error) {
        console.error('Error creating size:', error);
        res.status(500).json({ message: 'Error creating size', error: error.message });
    }
};
// Actualizar una talla existente
exports.updateSize = async (req, res) => {
    try {
        const { value } = req.body;
        const size = await Size.findByPk(req.params.id);

        if (!size) {
            return res.status(404).json({ message: 'Size not found' });
        }

        await size.update({ value });
        res.json(size);
    } catch (error) {
        res.status(500).json({ message: 'Error updating size' });
    }
};

// Eliminar una talla
exports.deleteSize = async (req, res) => {
    try {
        const size = await Size.findByPk(req.params.id);

        if (!size) {
            return res.status(404).json({ message: 'Size not found' });
        }

        await size.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting size' });
    }
};
