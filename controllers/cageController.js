const cageService = require('../services/cageService');
const animalsService = require('../services/animalService');

exports.getAllCages = async (req, res) => {
    if (!req.access.toLowerCase().includes('r')) {
        return res.status(403).send('Unauthorized');
    }
    const zooId = req.zooId;
    try {
        const cages = await cageService.getAllCages(zooId);
        res.json(cages);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCageById = async (req, res) => {
    if (!req.access.toLowerCase().includes('r')) {
        return res.status(403).send('Unauthorized');
    }
    const id = parseInt(req.params.id);
    const zooId = req.zooId;
    try {
        const cage = await cageService.getCageById(id, zooId);
        if (cage) {
            res.json(cage);
        } else {
            res.status(404).send('Cage not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createCage = async (req, res) => {
    if (!req.access.toLowerCase().includes('c')) {
        return res.status(403).send('Unauthorized');
    }
    const { name } = req.body;
    const zooId = req.zooId;
    try {
        const cage = await cageService.createCage(name, zooId);
        res.status(201).json(cage);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateCageById = async (req, res) => {
    if (!req.access.toLowerCase().includes('u')) {
        return res.status(403).send('Unauthorized');
    }
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const zooId = req.zooId;
    try {
        const updatedCage = await cageService.updateCageById(id, zooId, name);
        if (updatedCage) {
            res.json(updatedCage);
        } else
        {
            res.status(404).send('Cage not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCageById = async (req, res) => {
    if (!req.access.toLowerCase().includes('d')) {
        return res.status(403).send('Unauthorized');
    }
    const id = parseInt(req.params.id);
    const zooId = req.zooId;
    try {
        const success = await cageService.deleteCageById(id, zooId);
        if (success) {
            res.status(200).send('Cage deleted');
        } else {
            res.status(404).send('Cage not found');
            }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAnimalsByCageId = async (req, res) => {
    if (!req.access.toLowerCase().includes('r')) {
        return res.status(403).send('Unauthorized');
    }
    const id = parseInt(req.params.id);
    const zooId = req.zooId;
    try {
        if (await cageService.getCageById(id, zooId) === null) {
            return res.status(404).send('Cage not found');
        }

        const animals = await animalsService.getAnimalsByCageId(id);
        if (animals) {
            res.json(animals);
        } else {
            res.status(404).send('Cage not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};