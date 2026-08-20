const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Don = sequelize.define('Don', {
    idDon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type_don: {
        type: DataTypes.ENUM('especes', 'nature'),
        allowNull: false
    },
    montant: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    valeur_estimee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    date_don: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Don',
    timestamps: false
});

module.exports = Don;