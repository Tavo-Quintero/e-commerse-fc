module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('wishlist', {
        ordeid: {
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
        }
    }, {
        tableName: 'wishlist',
        timestamps: false,
        freezeTableName: true,
    });

    return Wishlist;
};
