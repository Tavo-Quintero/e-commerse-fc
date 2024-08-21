module.exports = (sequelize, DataTypes) => {
  const ShoeSizes = sequelize.define('shoesizes', {
    shoeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shoes',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    sizeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'sizes',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'shoesizes',
    timestamps: false,
    freezeTableName: true,
  });

  return ShoeSizes;
};
