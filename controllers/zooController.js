const zooService = require('../services/zooService');
const userService = require('../services/userService');

exports.createZoo = async (req, res) => {
    const { zoo_name, firstName, lastName, mail, password } = req.body;
    try {
        const zoo = await zooService.createZoo(zoo_name);
        const access = 'acrud';
        const user = await userService.createUser(firstName, lastName, mail, password, access, zoo.id);
        res.status(201).json({ "zoo_id": zoo.id });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateZoo = async (req, res) => {
    if (!req.access.toLowerCase().includes('u') || !req.access.toLowerCase().includes('a')) {
        return res.status(403).send('Unauthorized');
    }
    const id = req.zooId;
    const { name } = req.body;   
    try {
        const updatedZoo = await zooService.updateZooById(id, name);
        if (updatedZoo) {
            res.json(updatedZoo);
        } else {
            res.status(404).send('Zoo not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteZoo = async (req, res) => {
    if (!req.access.toLowerCase().includes('d') || !req.access.toLowerCase().includes('a')) {
        return res.status(403).send('Unauthorized');
    }
    const id = req.zooId;
    try {
        const success = await zooService.deleteZooById(id);
        if (success) {
            res.status(200).send('Zoo deleted');
        } else {
            res.status(404).send('Zoo not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
