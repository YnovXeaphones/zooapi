const { Animal } = require('../model/indexModel');

exports.getAllAnimals = async () => {
    return await Animal.findAll();
};

exports.getAnimalById = async (id) => {
    return await Animal.findByPk(id);
};

exports.createAnimal = async (name, specie, diet, cageId) => {
    return await Animal.create({ name, specie, diet, cageId });
};

exports.updateAnimalById = async (id, name = null, specie = null, diet = null, cageId = null) => {
    const animal = await Animal.findOne({
        where: { id }
    });
    if (animal) {
        await animal.update({ 
            name: name || animal.name, 
            specie: specie || animal.specie, 
            diet: diet || animal.diet, 
            cageId: cageId || animal.cageId});
        return animal;
    }
    return null;
};

exports.deleteAnimalById = async (id) => {
    const count = await Animal.destroy({
        where: { id }
    });
    return count > 0;
};

exports.getAnimalsByCageId = async (cageId) => {
    return await Animal.findAll({
        where: { cageId }
    });
};