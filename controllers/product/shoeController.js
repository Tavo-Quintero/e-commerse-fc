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
        const { name, brand, price, gender, sport, image, sizes, description, stock,enable  } = req.body;

        console.log('Datos recibidos:', { name, brand, price, gender, sport, image, sizes, description, stock,enable  });

        const shoe = await Shoe.create({ name, brand, price, gender, sport, image, description, stock,enable  });
        console.log('Shoe creado:', shoe);

        if (sizes && sizes.length > 0) {
            const sizeInstances = await Size.findAll({ where: { id: sizes } });
            console.log('Tallas encontradas:', sizeInstances);

            await shoe.setSizes(sizeInstances);
            console.log('Tallas asociadas al Shoe');
        }

        res.status(201).json(shoe);
    } catch (error) {
        console.error('Error al crear Shoe:', error);
        res.status(500).json({ message: 'Error creating shoe', error: error.message });
    }
};

// Actualizar una zapatilla existente
exports.updateShoe = async (req, res) => {
    try {
        const { name, brand, price, gender, sport, image, sizes, description, stock,enable } = req.body;
        const shoe = await Shoe.findByPk(req.params.id);

        if (!shoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }

        await shoe.update({ name, brand, price, gender, sport, image, description, stock,enable });

        if (sizes && sizes.length > 0) {
            const sizeInstances = await Size.findAll({ where: { id: sizes } });
            await shoe.setSizes(sizeInstances);
        }

        res.json(shoe);
    } catch (error) {
        console.error('Error updating shoe:', error); // Agrega un log más detallado
        res.status(500).json({ message: 'Error updating shoe', error: error.message });
    }
};

// Eliminar una zapatilla
exports.deleteShoe = async (req, res) => {
    try {
        console.log('Attempting to delete shoe with ID:', req.params.id);
        const shoe = await Shoe.findByPk(req.params.id);

        if (!shoe) {
            console.log('Shoe not found');
            return res.status(404).json({ message: 'Shoe not found' });
        }

        await shoe.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting shoe:', error);
        res.status(500).json({ message: 'Error deleting shoe', error: error.message });
    }
};

// Filtrar zapatillas por deporte, género, marca, etc.
exports.filterShoes = async (req, res) => {
  
    try {
        const { sport, gender, brand } = req.query;
        const where = {};

        console.log('Received query params:', req.query); // Verificar parámetros recibidos

        if (sport) where.sport = sport;
        if (gender) where.gender = gender;
        if (brand) where.brand = brand;

        console.log('Query conditions:', where); // Verificar condiciones de consulta

        const shoes = await Shoe.findAll({ where, include: 'sizes' });

        if (!shoes || shoes.length === 0) {
            return res.status(404).json({ message: 'No shoes found matching the criteria' });
        }
        res.json(shoes);
    } catch (error) {
        console.log("cualquier cosa")
        console.error('Error filtering shoes:', error); // Log del error
        res.status(500).json({ message: 'Error filtering shoes', error: error.message });
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
        console.error('Error fetching shoe sizes:', error); // Imprime el error en la consola
        res.status(500).json({ message: 'Error fetching shoe sizes', error: error.message });
    }
};
