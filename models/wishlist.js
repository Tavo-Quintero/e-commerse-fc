module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('wishlist', {
        shoeid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'shoes',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        userid: {
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
