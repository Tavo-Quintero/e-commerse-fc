// scripts/syncModels.js
const sequelize = require('../config/config');
const { User, Shoe, Size, ShoeSizes,Addresses,Order, Orderitem, Useraddresses,Wishlist } = require('../models');

const syncModels = async () => {
  try {
    await User.sync({ force: false });
    await Shoe.sync({ force: false });
    await Size.sync({ force: false });
    await ShoeSizes.sync({ force: false });
    await Addresses.sync({ force: false });
    await Order.sync({ force: false });
    await Orderitem.sync({ force: false });
    await Useraddresses.sync({ force: false });
    await Wishlist.sync({ force: false });
    console.log('Modelos sincronizados con éxito');
  } catch (error) {
    console.error('Error sincronizando modelos:', error);
  } finally {
    await sequelize.close();
  }
};
syncModels();