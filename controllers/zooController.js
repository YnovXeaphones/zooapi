const zooService = require('../services/zooService');
const userService = require('../services/userService');

exports.createZoo = async (req, res) => {
    const { zoo_name, firstname, lastname, mail, password } = req.body;   
    try {
        const zoo = await zooService.createZoo(zoo_name);
        const access = 'acrud';
        const user = await userService.createUser(firstname, lastname, mail, password, access, zoo.id);
        res.status(201).json({ "zoo_id": zoo.id });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateZooById = async (req, res) => {
    const id = req.params.id;
    const { name, date } = req.body;   
    try {
        const updatedZoo = await zooService.updateZooById(id, name, date);
        if (updatedZoo) {
            res.json(updatedZoo);
        } else {
            res.status(404).send('Zoo not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteZooById = async (req, res) => {
    const id = req.params.id; 
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
