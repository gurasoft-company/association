const sequelize = require('../config/database');

// Importer les modèles
const Projet = require('./Projet');
const Besoin = require('./Besoin');
const Donateur = require('./Donateur');
const Don = require('./Don');
const Benevole = require('./Benevole');
const Participation = require('./Participation');
const Administrateur = require('./Administrateur');
const Image = require('./Image'); // ← NOUVEAU

// === RELATIONS ===

// Projet → Besoin (un projet a plusieurs besoins)
Projet.hasMany(Besoin, { foreignKey: 'idProjet', onDelete: 'CASCADE' });
Besoin.belongsTo(Projet, { foreignKey: 'idProjet' });

// Donateur → Don (un donateur peut faire plusieurs dons)
Donateur.hasMany(Don, { foreignKey: 'idDonateur', onDelete: 'CASCADE' });
Don.belongsTo(Donateur, { foreignKey: 'idDonateur' });


// Relations pour les images (NOUVEAU)
Projet.hasMany(Image, { foreignKey: 'idProjet', onDelete: 'CASCADE' });
Image.belongsTo(Projet, { foreignKey: 'idProjet' });

// Projet → Don (un projet peut recevoir plusieurs dons)
Projet.hasMany(Don, { foreignKey: 'idProjet', onDelete: 'CASCADE' });
Don.belongsTo(Projet, { foreignKey: 'idProjet' });

// Besoin → Don (un besoin peut recevoir plusieurs dons en nature)
Besoin.hasMany(Don, { foreignKey: 'idBesoin', onDelete: 'SET NULL' });
Don.belongsTo(Besoin, { foreignKey: 'idBesoin' });

// Benevole → Participation (un bénévole peut participer à plusieurs projets)
Benevole.hasMany(Participation, { foreignKey: 'idBenevole', onDelete: 'CASCADE' });
Participation.belongsTo(Benevole, { foreignKey: 'idBenevole' });

// Projet → Participation (un projet peut avoir plusieurs bénévoles)
Projet.hasMany(Participation, { foreignKey: 'idProjet', onDelete: 'CASCADE' });
Participation.belongsTo(Projet, { foreignKey: 'idProjet' });

// Synchronisation
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('✅ Base de données synchronisée avec Sequelize');
    } catch (error) {
        console.error('❌ Erreur lors de la synchronisation:', error);
    }
};

module.exports = {
    sequelize,
    Projet,
    Besoin,
    Donateur,
    Don,
    Image,
    Benevole,
    Participation,
    Administrateur,
    syncDatabase
};