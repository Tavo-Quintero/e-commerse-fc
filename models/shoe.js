module.exports = (sequelize, DataTypes) => {
  const Shoe = sequelize.define('shoes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sport: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'shoes',
    timestamps: false,
    freezeTableName: true,
  });

  Shoe.associate = (models) => {
    Shoe.belongsToMany(models.Size, { through: models.ShoeSizes, foreignKey: 'shoeid', as: 'sizes' });
    Shoe.belongsToMany(models.User, { through: models.Wishlist, foreignKey: 'shoeid', as: 'users' });
    Shoe.belongsToMany(models.Order, { through: models.Orderitem, foreignKey: 'shoeid', as: 'order' });
  };

  return Shoe;
};
