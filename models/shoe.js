module.exports = (sequelize, DataTypes) => {
  const Shoe = sequelize.define('Shoe', {
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
    }
  }, {
    tableName: 'shoes'
  });

  Shoe.associate = (models) => {
    // Cambia 'sizes' por 'Size' si el alias en el otro modelo es 'Size'
    Shoe.belongsToMany(models.Size, { through: models.ShoeSizes, foreignKey: 'shoeId', as: 'sizes' });
  };

  return Shoe;
};
