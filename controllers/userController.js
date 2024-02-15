const userService = require('../services/userService');

exports.getAllUsers = (req, res) => {
    res.json(userService.getAllUsers());
};

exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = userService.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

exports.createUser = (req, res) => {
    const { firstName, lastName, mail, password, access, zooId } = req.body;
    const user = userService.createUser(firstName, lastName, mail, password, access, zooId);
    res.status(201).json(user);
};

exports.updateUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, mail, password, access, zooId } = req.body;
    const updatedUser = userService.updateUserById(id, firstName, lastName, mail, password, access, zooId);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
};

exports.deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const success = userService.deleteUserById(id);
    if (success) {
        res.status(200).send('User delete');
    } else {
        res.status(404).send('User not found');
    }
};
