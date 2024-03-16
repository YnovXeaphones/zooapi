const { User } = require('../model/indexModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.getAllUsers = async (zooId) => {
    return await User.findAll({ 
        where: { zooId },
        attributes: { exclude: ['password','zooId'] } 
    });
};

exports.getUserByPK = async (id) => {
    return await User.findByPk(id);
};

exports.getUserById = async (id, zooId) => {
    return await User.findOne({
        where: { id: id, zooId: zooId },
        attributes: { exclude: ['password','zooId'] }
    });
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

exports.updateUserById = async (id, zooId, firstName = null, lastName = null, mail = null, access = null) => {
    const user =  await User.findOne({ where: { id: id, zooId: zooId } });
    if (user) {
        return await user.update({
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            mail: mail || user.mail,
            access: access || user.access,
        });
    }
    return null;
};

exports.deleteUserById = async (id, zooId) => {
    const count = await User.destroy({
        where: { id: id, zooId: zooId }
    });
    return count > 0;
};

exports.authenticateUser = async (mail, password) => {
    const user = await User.findOne({ where: { mail } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user; // L'authentification a réussi
    }
    return null; // Échec de l'authentification
};
