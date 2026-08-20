const { Sequelize } = require('sequelize');
const path = require('path');

// Connexion à la base de données SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../association.db'),
    logging: false // Désactiver les logs SQL
});

// Tester la connexion
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à SQLite établie avec Sequelize');
    } catch (error) {
        console.error('❌ Erreur de connexion:', error);
    }
})();

module.exports = sequelize;