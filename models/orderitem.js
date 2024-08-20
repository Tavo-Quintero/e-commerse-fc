module.exports = (sequelize, DataTypes) => {
    const Orderitem = sequelize.define('orderitem', {
        orderid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'order',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        shoeid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'shoes',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'orderitem',
        timestamps: false,
        freezeTableName: true,
    });

    return Orderitem;
};
