module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        statuspago: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        statusenvio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Se utiliza Sequelize.NOW si deseas que la fecha por defecto sea la actual
        },
        total: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // Puedes cambiar esto según tus necesidades
        }
    }, {
        tableName: 'order',
        timestamps: false,
        freezeTableName: true,
    });

    // Asociación con Orderitem
    Order.associate = (models) => {
        Order.belongsToMany(models.Shoe, {
            through: models.Orderitem,
            foreignKey: 'orderid',
            as: 'shoes'
        });
    };

    return Order;
};
