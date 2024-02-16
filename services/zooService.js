const { Zoo } = require('../model/indexModel');

exports.createZoo = async (name, date) => {
    try {
    const newZoo = await Zoo.create({ name, date });
    return newZoo;
    } catch (error) {
        console.error('Error creating the zoo:', error);
        throw error;
    }
};

exports.updateZooById = async (id, name, date) => {
    const zoo = await Zoo.findByPk(id);
    if (!zoo) {
        return null;
    }
    await zoo.update({ name, date });
    return zoo;
};

exports.deleteZooById = async (id) => {
    const count = await Zoo.destroy({
        where: { id }
    });
    return count > 0;
};
