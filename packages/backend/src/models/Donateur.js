const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Donateur = sequelize.define('Donateur', {
    idDonateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    prenom: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    telephone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    date_inscription: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Donateur',
    timestamps: false
});

module.exports = Donateur;