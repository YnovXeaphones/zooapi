const Sequelize = require('sequelize');
const dbConfig = require('../db.config')

const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
})

const User = require('./user')(instance);
const Zoo = require('./zoo')(instance);
const Cage = require('./cage')(instance);
const Animal = require('./animal')(instance);

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
