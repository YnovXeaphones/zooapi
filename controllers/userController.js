const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createUser = async (req, res) => {
    const { firstName, lastName, mail, password, access, zooId } = req.body;
    try {
        const user = await userService.createUser(firstName, lastName, mail, password, access, zooId);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, mail, password, access, zooId } = req.body;
    try {
        const updatedUser = await userService.updateUserById(id, firstName, lastName, mail, password, access, zooId);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const success = await userService.deleteUserById(id);
        if (success) {
            res.status(200).send('User deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
