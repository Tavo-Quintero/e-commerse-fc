// api.
var express = require('express');
var router = express.Router();
var shoesController = require('../controllers/product/shoeController');
var sizesController = require('../controllers/product/sizeController');
var usersController = require('../controllers/product/userController');
var authController = require('../controllers/product/authController');
var paymentController = require('../controllers/product/paymentController');
var { User, Shoe, Size, ShoeSizes, sequelize } = require('../models'); // Importa los modelos configurados con Sequelize
var adresseController = require("../controllers/product/adressesController");
var orderController = require("../controllers/product/orderController");

router.get('/order', orderController.getAllOrder)
router.get('/order/:id', orderController.getOrderById);
router.post('/order/', orderController.createOrder);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

router.get('/ordershoe', orderController.getAllOrdershoe)

router.get('/adresses', adresseController.getAllAddresses);
router.post('/adresses/', adresseController.createAddress);
router.put('/adresses/:id', adresseController.updateAddress);
router.delete('/adresses/:id', adresseController.deleteAddress);

router.post('/createorder', paymentController.createOrder )

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

// Obtener todos los usuarios
router.get('/users', usersController.getAllUsers);
router.post('/users', usersController.register);
router.post('/users', usersController.login);
router.get('/users/:id', usersController.getUserProfile);
router.put('/users/:id', usersController.updateUserProfile);
router.delete('/users/:id', usersController.deleteUser);
router.get('/usersshoe', usersController.getAllUserShoe);
router.post('/usersshoe', usersController.createUsershoe);

router.get('/useraddresses', usersController.getAllUserAddresses);
router.post('/useraddresses', usersController.createUserAddress);
router.delete('/useraddresses/:id', usersController.deleteUsersshoe);

// Rutas de autenticación
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/google', authController.googleAuth);

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
