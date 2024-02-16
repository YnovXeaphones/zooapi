const cageService = require('../services/cageService');

exports.getAllCages = async (req, res) => {
    try {
        const cages = await cageService.getAllCages();
        res.json(cages);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCageById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cage = await cageService.getCageById(id);
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
    const { name, zooId } = req.body;
    try {
        const cage = await cageService.createCage(name, zooId);
        res.status(201).json(cage);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateCageById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, zooId } = req.body;
    try {
        const updatedCage = await cageService.updateCageById(id, name, zooId);
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
    const id = parseInt(req.params.id);
    try {
        const success = await cageService.deleteCageById(id);
        if (success) {
            res.status(200).send('Cage deleted');
        } else {
            res.status(404).send('Cage not found');
            }
    } catch (error) {
        res.status(500).send(error.message);
    }
};