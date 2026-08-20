const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Besoin = sequelize.define('Besoin', {
    idBesoin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    unite: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    valeur_estimee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'Besoin',
    timestamps: false
});

module.exports = Besoin;