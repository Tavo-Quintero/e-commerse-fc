// scripts/syncModels.js

const sequelize = require('../config/config');
const { User, Shoe, Size, ShoeSizes } = require('../models');

const syncModels = async () => {
  try {
    // Sincronizar modelos con `force: true` borra las tablas existentes
    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados con éxito');
  } catch (error) {
    console.error('Error sincronizando modelos:', error);
  } finally {
    await sequelize.close();
  }
};

syncModels();
