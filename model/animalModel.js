const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Animal extends Model {}

Animal.init({
    name: DataTypes.STRING,
    specie: DataTypes.STRING,
    diet: DataTypes.ENUM('Carnivore', 'Herbivore', 'Omnivore'),
    cageId: {
        type: DataTypes.INTEGER,
        references: { model: 'Cage', key: 'id' }
    }
},  { sequelize, modelName: 'Animal' });

module.exports = Animal;
