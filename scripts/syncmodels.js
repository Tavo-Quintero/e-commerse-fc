// scripts/syncModels.js
const sequelize = require('../config/config');
const { User, Shoe, Size, ShoeSizes,addresses,order, orderitem } = require('../models');

const syncModels = async () => {
  try {
    await User.sync({ force: true });
    await Shoe.sync({ force: true });
    await Size.sync({ force: true });
    await ShoeSizes.sync({ force: true });
    await addresses.sync({ force: true });
    await order.sync({ force: true });
    await orderitem.sync({ force: true });
    console.log('Modelos sincronizados con éxito');
  } catch (error) {
    console.error('Error sincronizando modelos:', error);
  } finally {
    await sequelize.close();
  }
};
syncModels();