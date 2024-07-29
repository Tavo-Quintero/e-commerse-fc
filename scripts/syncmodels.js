const sequelize = require('../config/config'); // Ajusta la ruta según sea necesario

const syncModels = async () => {
  try {
    // Sincronizar modelos con `alter: true` para ajustar la estructura sin eliminar datos
    await sequelize.sync({ alter: true });
    console.log('Database & tables have been updated!');
    process.exit(0); // Salir del proceso una vez completada la sincronización
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1); // Salir con código de error
  }
};

syncModels();
