var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Requerir el paquete cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configuración de middleware
app.use(logger('dev')); // Registro de solicitudes HTTP
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: false })); // Parseo de datos URL-encoded
app.use(cookieParser()); // Parseo de cookies
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde 'public'

// Configuración de CORS
app.use(cors());

// Configuración de rutas
app.use('/', indexRouter); // Ruta principal
app.use('/users', usersRouter); // Ruta para usuarios
app.use('/api', apiRouter); // Ruta para API

// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejo de errores generales
app.use(function(err, req, res, next) {
  // Configuración de variables locales para mensajes de error
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Enviar respuesta JSON para errores
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
