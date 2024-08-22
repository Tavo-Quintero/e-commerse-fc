module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    ban: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }

  }, {
    tableName: 'users',
    timestamps: false,
    freezeTableName: true,
  });
  User.associate = (models) => {
    User.belongsToMany(models.Shoe, { through: models.Wishlist, foreignKey: 'userid', as: 'shoes' });
    User.belongsToMany(models.Addresses, { through: models.Useraddresses, foreignKey: 'userid', as: 'addresses' });

  };

  return User;
};