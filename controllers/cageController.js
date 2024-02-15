const cageService = require('../services/cageService');

exports.getAllCages = (req, res) => {
    res.json(cageService.getAllCages());
};

exports.getCageById = (req, res) => {
    const id = parseInt(req.params.id);
    const cage = cageService.getCageById(id);
    if (cage) {
        res.json(cage);
    } else {
        res.status(404).send('Cage not found');
    }
};

exports.createCage = (req, res) => {
    const { name, zooId } = req.body;
    const cage = cageService.createCage(name, zooId);
    res.status(201).json(cage);
};

exports.updateCageById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, zooId } = req.body;
    const updatedCage = cageService.updateCageById(id, name, zooId);
    if (updatedCage) {
        res.json(updatedCage);
    } else {
        res.status(404).send('Cage not found');
    }
};

exports.deleteCageById = (req, res) => {
    const id = parseInt(req.params.id);
    const success = cageService.deleteCageById(id);
    if (success) {
        res.status(200).send('Cage delete');
    } else {
        res.status(404).send('Cage not found');
    }
};
