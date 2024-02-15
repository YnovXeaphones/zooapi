const zooService = require('../services/zooService');

exports.getAllZoos = (req, res) => {
    res.json(zooService.getAllZoos());
};

exports.getZooById = (req, res) => {
    const id = req.params.id;
    const zoo = zooService.getZooById(id);
    if (zoo) {
        res.json(zoo);
    } else {
        res.status(404).send('Zoo not found');
    }
};

exports.createZoo = (req, res) => {
    const { id, name, date } = req.body;
    try {
      const zoo = zooService.createZoo(id, name, date);
      res.status(201).json(zoo);
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.updateZooById = (req, res) => {
    const id = req.params.id;
    const { name, date } = req.body;
    const updatedZoo = zooService.updateZooById(id, name, date);
    if (updatedZoo) {
        res.json(updatedZoo);
    } else {
        res.status(404).send('Zoo not found');
    }
};

exports.deleteZooById = (req, res) => {
    const id = req.params.id;
    const success = zooService.deleteZooById(id);
    if (success) {
        res.status(200).send('Zoo deleted');
    } else {
        res.status(404).send('Zoo not found');
    }
};
