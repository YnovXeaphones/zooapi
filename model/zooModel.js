const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Zoo extends Model {}

Zoo.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY
},  { sequelize, modelName: 'Zoo' });

module.exports = Zoo;
