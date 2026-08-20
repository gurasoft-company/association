const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participation = sequelize.define('Participation', {
    idParticipation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date_debut: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    date_fin: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: 'Participation',
    timestamps: false
});

module.exports = Participation;