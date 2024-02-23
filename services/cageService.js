const { Cage } = require('../model/indexModel');

exports.getAllCages = async () => {
    return await Cage.findAll();
};

exports.getCageById = async (id) => {
    return await Cage.findByPk(id);
};

exports.createCage = async (name, zooId) => {
    return await Cage.create({ name, zooId });
};

exports.updateCageById = async (id, name, zooId) => {
    const cage = await Cage.findByPk(id);
    if (cage) {
        await cage.update({ name, zooId });
        return cage;
    }
    return null;
};

exports.deleteCageById = async (id) => {
    const count = await Cage.destroy({
        where: { id }
    });
    return count > 0;
};