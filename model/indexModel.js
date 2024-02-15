const Sequelize = require('sequelize');
const dbConfig = require('../db.config')

const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
})

const User = require('./user');
const Zoo = require('./zoo');
const Cage = require('./cage');
const Animal = require('./animal');

// Ici, vous définirez les relations entre les modèles
Zoo.hasMany(User, { foreignKey: 'zooId' });
Zoo.hasMany(Cage, { foreignKey: 'zooId' });
Cage.belongsTo(Zoo, { foreignKey: 'zooId' });
Cage.hasMany(Animal, { foreignKey: 'cageId' });
Animal.belongsTo(Cage, { foreignKey: 'cageId' });

const db = {
    instance,
    instance,
    User,
    Zoo,
    Cage,
    Animal
};

module.exports = db;
