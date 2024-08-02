const { Sequelize } = require('sequelize');

// Usa DATABASE_URL si está definida, de lo contrario, usa la configuración local
const isProduction = !!process.env.DATABASE_URL;

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sneakers', {
  dialect: isProduction ? 'postgres' : undefined,
  host: isProduction ? undefined : 'localhost',
  username: isProduction ? undefined : 'postgres',
  password: isProduction ? undefined : '123',
  database: isProduction ? undefined : 'sneakers',
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false // Esto puede ser necesario para algunos proveedores
    }
  } : {},
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
