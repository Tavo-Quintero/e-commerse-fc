module.exports = (sequelize, DataTypes) => {
    const Useraddresses = sequelize.define('useraddresses', {
        userid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'shoes',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        addressesid: {
            type: DataTypes.INTEGER,
            references: {
                model: ' addressses',
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
