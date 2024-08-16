// scripts/syncModels.js
const sequelize = require('../config/config');
const { User, Shoe, Size, ShoeSizes,Addresses,Order, Orderitem, Useraddresses,Wishlist } = require('../models');

const syncModels = async () => {
  try {
    await User.sync({ force: true });
    await Shoe.sync({ force: true });
    await Size.sync({ force: true });
    await ShoeSizes.sync({ force: true });
    await Addresses.sync({ force: true });
    await Order.sync({ force: true });
    await Orderitem.sync({ force: true });
    await Useraddresses.sync({ force: true });
    await Wishlist.sync({ force: true });
    console.log('Modelos sincronizados con éxito');
  } catch (error) {
    console.error('Error sincronizando modelos:', error);
  } finally {
    await sequelize.close();
  }
};
syncModels();