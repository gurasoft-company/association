const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Benevole = sequelize.define('Benevole', {
    idBenevole: {
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
    tableName: 'Benevole',
    timestamps: false
});

module.exports = Benevole;