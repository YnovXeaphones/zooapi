const { User } = require('../model/indexModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.getAllUsers = async () => {
    return await User.findAll();
};

exports.getUserById = async (id) => {
    return await User.findByPk(id);
};

exports.createUser = async (firstName, lastName, mail, password, access, zooId) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await User.create({
        firstName,
        lastName,
        mail,
        password: hashedPassword,
        access,
        zooId
    });
};

exports.updateUserById = async (id, firstName, lastName, mail, password, access, zooId) => {
    const user = await User.findByPk(id);
    if (user) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return await user.update({
            firstName,
            lastName,
            mail,
            password: hashedPassword,
            access,
            zooId
        });
    }
    return null;
};

exports.deleteUserById = async (id) => {
    const count = await User.destroy({
        where: { id }
    });
    return count > 0;
};
