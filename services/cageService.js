const { Cage } = require('../model/indexModel');

exports.getAllCages = async (zooId) => {
    return await Cage.findAll({
        where: { zooId },
        attributes: { exclude: ['zooId'] }
    });
};

exports.getCageById = async (id, zooId) => {
    return await Cage.findOne({
        where: { id, zooId },
        attributes: { exclude: ['zooId'] }
    });
};

exports.createCage = async (name, zooId) => {
    return await Cage.create({ name, zooId });
};

exports.updateCageById = async (id, zooId, name = null) => {
    const cage = await Cage.findOne({
        where: { id, zooId },
        attributes: { exclude: ['zooId'] }
    });
    if (cage) {
        await cage.update({ name: name || cage.name });
        return cage;
    }
    return null;
};

exports.deleteCageById = async (id, zooId) => {
    const count = await Cage.destroy({
        where: { id, zooId }
    });
    return count > 0;
};