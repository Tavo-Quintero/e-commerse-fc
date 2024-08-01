// api.
var express = require('express');
var router = express.Router();
var shoesController = require('../controllers/product/shoeController');
var sizesController = require('../controllers/product/sizeController');
var usersController = require('../controllers/product/userController');
var { User, Shoe, Size, ShoeSizes, sequelize } = require('../models'); // Importa los modelos configurados con Sequelize



// Obtener todas las zapatillas
router.get('/shoes', shoesController.getAllShoes);
router.get('/shoes/id/:id', shoesController.getShoeById);
router.post('/shoes', shoesController.createShoe);
router.put('/shoes/:id', shoesController.updateShoe);
router.delete('/shoes/:id', shoesController.deleteShoe);
router.get('/shoes/filter', shoesController.filterShoes);
router.get('/shoes/:id/sizes', shoesController.getShoeSizes);
// Obtener todas las tallas
router.get('/sizes', sizesController.getAllSizes);
router.get('/sizes/:id', sizesController.getSizeById);
router.post('/sizes', sizesController.createSize);
router.put('/sizes/:id', sizesController.updateSize);
router.delete('/sizes/:id', sizesController.deleteSize);
// Obtener todos los usuarios
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.post('/users', usersController.createUser);
router.put('/users/:id', usersController.updateUser);

router.get('/shoesizes', async function(req, res, next) {
    try {
        const shoesizes = await ShoeSizes.findAll();
        res.json(shoesizes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
