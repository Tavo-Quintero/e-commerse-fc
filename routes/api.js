// api.js

var express = require('express');
var router = express.Router();
var { User, Shoe, Size, ShoeSizes, sequelize } = require('../models'); // Importa los modelos configurados con Sequelize

// Obtener todos los usuarios
router.get('/users', async function(req, res, next) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todas las zapatillas
router.get('/shoes', async (req, res) => {
    try {
      const shoes = await Shoe.findAll({ include: { model: Size, as: 'sizes' } });
      console.log('Shoes:', shoes); // Verifica la salida en la consola
      res.json(shoes);
    } catch (error) {
      console.error('Error fetching shoes:', error);
      res.status(500).json({ message: 'Error fetching shoes' });
    }
  });

// Obtener todas las tallas
router.get('/sizes', async function(req, res, next) {
    try {
        const sizes = await Size.findAll();
        res.json(sizes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todas las relaciones de tallas de zapatillas
router.get('/shoesizes', async function(req, res, next) {
    try {
        const shoesizes = await ShoeSizes.findAll();
        res.json(shoesizes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Test de la base de datos
router.get('/test-db', async function(req, res, next) {
    try {
        const result = await sequelize.query('SELECT NOW()');
        res.json(result[0]); // Los resultados de la consulta se encuentran en el primer elemento del array
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
