const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    if (!req.access.toLowerCase().includes('r') || !req.access.toLowerCase().includes('a')) {
        return res.status(403).send('Unauthorized');
    }
    const zooId = req.zooId;
    try {
        const users = await userService.getAllUsers(zooId);
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    if (!req.access.toLowerCase().includes('r') || !req.access.toLowerCase().includes('a')) {
        return res.status(403).send('Unauthorized');
    }
    const id = parseInt(req.params.id);
    const zooId = req.zooId;
    try {
        const user = await userService.getUserById(id, zooId);
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
    if (!req.access.toLowerCase().includes('c') || !req.access.toLowerCase().includes('a')) {
        return res.status(403).send('Unauthorized');
    }
    const { firstName, lastName, mail, password, access } = req.body;
    const zooId = req.zooId;
    try {
        const user = await userService.createUser(firstName, lastName, mail, password, access, zooId);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateUserById = async (req, res) => {
    if (!req.access.toLowerCase().includes('u') || !req.access.toLowerCase().includes('a')) {
        return res.status(403).send('Unauthorized');
    }
    const id = parseInt(req.params.id);
    const { firstName, lastName, mail, access } = req.body;
    if (id === req.userId && access && access !== req.access) {
        return res.status(403).send('You cannot change your own access');
    }
    const zooId = req.zooId;
    try {
        const updatedUser = await userService.updateUserById(id, zooId, firstName, lastName, mail, access);
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
    if (!req.access.toLowerCase().includes('d') || !req.access.toLowerCase().includes('a')) {
        return res.status(403).send('Unauthorized');
    }
    
    const id = parseInt(req.params.id);
    const zooId = req.zooId;

    if (id === req.userId) {
        return res.status(403).send('You cannot delete yourself');
    }

    try {
        const success = await userService.deleteUserById(id, zooId);
        if (success) {
            res.status(200).send('User deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
