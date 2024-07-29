const { Shoe, Size } = require('../../models');

// Obtener todas las zapatillas
exports.getAllShoes = async (req, res) => {
    try {
        const shoes = await Shoe.findAll({ include: { model: Size, as: 'sizes' } });
        res.json(shoes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoes' });
    }
};

// Obtener una zapatilla por su ID
exports.getShoeById = async (req, res) => {
    try {
        const shoe = await Shoe.findByPk(req.params.id, { include: 'sizes' });
        if (!shoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.json(shoe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoe' });
    }
};

// Crear una nueva zapatilla
exports.createShoe = async (req, res) => {
    try {
        const { name, brand, price, gender, sport, image, sizes } = req.body;
        const shoe = await Shoe.create({ name, brand, price, gender, sport, image });

        if (sizes && sizes.length > 0) {
            const sizeInstances = await Size.findAll({ where: { id: sizes } });
            await shoe.setSizes(sizeInstances);
        }

        res.status(201).json(shoe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shoe' });
    }
};

// Actualizar una zapatilla existente
exports.updateShoe = async (req, res) => {
    try {
        const { name, brand, price, gender, sport, image, sizes } = req.body;
        const shoe = await Shoe.findByPk(req.params.id);

        if (!shoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }

        await shoe.update({ name, brand, price, gender, sport, image });

        if (sizes && sizes.length > 0) {
            const sizeInstances = await Size.findAll({ where: { id: sizes } });
            await shoe.setSizes(sizeInstances);
        }

        res.json(shoe);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shoe' });
    }
};

// Eliminar una zapatilla
exports.deleteShoe = async (req, res) => {
    try {
        const shoe = await Shoe.findByPk(req.params.id);

        if (!shoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }

        await shoe.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shoe' });
    }
};

// Filtrar zapatillas por deporte, género, marca, etc.
exports.filterShoes = async (req, res) => {
    try {
        const { sport, gender, brand } = req.query;
        const where = {};

        if (sport) where.sport = sport;
        if (gender) where.gender = gender;
        if (brand) where.brand = brand;

        const shoes = await Shoe.findAll({ where, include: 'sizes' });
        res.json(shoes);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering shoes' });
    }
};

// Obtener tallas disponibles para una zapatilla
exports.getShoeSizes = async (req, res) => {
    try {
        const shoe = await Shoe.findByPk(req.params.id, { include: 'sizes' });
        if (!shoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.json(shoe.sizes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoe sizes' });
    }
};
