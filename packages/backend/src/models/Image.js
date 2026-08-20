const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
    idImage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    titre: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    idProjet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Projet',
            key: 'idProjet'
        }
    }
}, {
    tableName: 'Image',
    timestamps: false
});

module.exports = Image;