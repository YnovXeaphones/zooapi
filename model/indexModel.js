const Sequelize = require('sequelize');
const { dbConfig } = require('../config')

const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
})

const User = require('./userModel')(instance);
const Zoo = require('./zooModel')(instance);
const Cage = require('./cageModel')(instance);
const Animal = require('./animalModel')(instance);

Zoo.hasMany(User, { foreignKey: 'zooId' });
Zoo.hasMany(Cage, { foreignKey: 'zooId' });
Cage.belongsTo(Zoo, { foreignKey: 'zooId' });
Cage.hasMany(Animal, { foreignKey: 'cageId' });
Animal.belongsTo(Cage, { foreignKey: 'cageId' });

const db = {
    instance,
    User,
    Zoo,
    Cage,
    Animal
};

module.exports = db;
