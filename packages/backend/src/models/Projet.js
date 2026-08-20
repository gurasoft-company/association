const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Projet = sequelize.define('Projet', {
    idProjet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    objectif: {
        type: DataTypes.DECIMAL(10, 2)
    },
    date_debut: {
        type: DataTypes.DATEONLY
    },
    date_fin: {
        type: DataTypes.DATEONLY
    },
    statut: {
        type: DataTypes.STRING(50),
        defaultValue: 'en_cours'
    }
}, {
    tableName: 'Projet',
    timestamps: false
});

module.exports = Projet;