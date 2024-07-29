const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sneakers', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,  
});

module.exports = sequelize;