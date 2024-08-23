module.exports = (sequelize, DataTypes) => {
    const Addresses = sequelize.define('Addresses', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provincia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigopostal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberphone: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'addresses',
        timestamps: false,
        freezeTableName: true,
    });

    Addresses.associate = (models) => {
        Addresses.belongsToMany(models.User, { through: models.Useraddresses, foreignKey: 'addressesid', as: 'users' });
    };

    return Addresses;
}

