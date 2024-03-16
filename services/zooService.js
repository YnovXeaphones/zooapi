const { Zoo, User } = require('../model/indexModel');

exports.createZoo = async (name, date) => {
    try {
    const newZoo = await Zoo.create({ name, date });
    return newZoo;
    } catch (error) {
        console.error('Error creating the zoo:', error);
        throw error;
    }
};

exports.updateZooById = async (id, name = null) => {
    const zoo = await Zoo.findByPk(id);
    if (!zoo) {
        return null;
    }
    await zoo.update({ name: name || zoo.name });
    return zoo;
};

exports.deleteZooById = async (id) => {
    await User.destroy({ 
        where: { zooId: id }
     });

    const count = await Zoo.destroy({
        where: { id }
    });
    return count > 0;
};
