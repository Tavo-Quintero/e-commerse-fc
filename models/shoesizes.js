module.exports = (sequelize, DataTypes) => {
  const ShoeSizes = sequelize.define('ShoeSizes', {
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
    }
  }, {
    tableName: 'shoesizes',
    timestamps: false
  });

  return ShoeSizes;
};
