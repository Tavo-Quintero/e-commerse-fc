module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('wishlist', {
        shoeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'shoes',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
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
