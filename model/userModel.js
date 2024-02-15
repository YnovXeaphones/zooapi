const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mail: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    access: DataTypes.STRING,
    zooId: { 
        type: DataTypes.STRING,
        references: { model: 'Zoo', key: 'id' }
    }
},  { sequelize, modelName: 'User' });

module.exports = User;