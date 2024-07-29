const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const models = {};

// Importar modelos
models.Shoe = require('./shoe')(sequelize, Sequelize);
models.Size = require('./size')(sequelize, Sequelize);
models.ShoeSizes = require('./shoesizes')(sequelize, Sequelize);

// Configurar asociaciones
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;