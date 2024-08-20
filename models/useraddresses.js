module.exports = (sequelize, DataTypes) => {
    const Useraddresses = sequelize.define('useraddresses', {
        addressesid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'addresses',
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
        tableName: 'useraddresses',
        timestamps: false,
        freezeTableName: true,
    });


    return Useraddresses;
};
