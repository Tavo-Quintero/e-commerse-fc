const { Sequelize } = require('sequelize');

// Usa la variable de entorno DATABASE_URL si está definida, de lo contrario, usa la configuración local
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'sneakers', 
  process.env.DATABASE_URL ? undefined : 'postgres', 
  process.env.DATABASE_URL ? undefined : '123', 
  {
    host: process.env.DATABASE_URL ? undefined : 'localhost',
    dialect: 'postgres',
    logging: false,
    dialectOptions: process.env.DATABASE_URL ? {
      ssl: {
        require: true,
        rejectUnauthorized: false // Esto puede ser necesario si usas una base de datos con SSL
      }
    } : {}
  }
);

module.exports = sequelize;
