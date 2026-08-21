const { Sequelize } = require('sequelize');
const path = require('path');

// Détection de l'environnement
const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction && process.env.DATABASE_URL) {
  // PostgreSQL (production)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
} else {
  // SQLite (développement)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../association.db'),
    logging: false
  });
}

// Tester la connexion
(async () => {
  try {
    await sequelize.authenticate();
    const dbName = isProduction ? 'PostgreSQL' : 'SQLite';
    console.log(`✅ Connexion à ${dbName} établie avec Sequelize`);
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
  }
})();

module.exports = sequelize;