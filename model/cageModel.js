const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Cage extends Model {}

Cage.init({
    name: DataTypes.STRING,
    zooId: {
        type: DataTypes.STRING,
        references: { model: 'Zoo', key: 'id' }
    }
},  { sequelize, modelName: 'Cage' });

module.exports = Cage;
