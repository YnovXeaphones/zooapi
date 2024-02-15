const animalService = require('../services/animalService');

exports.getAllAnimals = (req, res) => {
    res.json(animalService.getAllAnimals());
};

exports.getAnimalById = (req, res) => {
    const id = parseInt(req.params.id);
    const animal = animalService.getAnimalById(id);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).send('Animal not found');
    }
};

exports.createAnimal = (req, res) => {
    const { name, specie, diet, cageId } = req.body;
    const animal = animalService.createAnimal(name, specie, diet, cageId);
    res.status(201).json(animal);
};

exports.updateAnimalById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, specie, diet, cageId } = req.body;
    const updatedAnimal = animalService.updateAnimalById(id, name, specie, diet, cageId);
    if (updatedAnimal) {
        res.json(updatedAnimal);
    } else {
        res.status(404).send('Animal not found');
    }
};

exports.deleteAnimalById = (req, res) => {
    const id = parseInt(req.params.id);
    const success = animalService.deleteAnimalById(id);
    if (success) {
        res.status(200).send('Animal deleted');
    } else {
        res.status(404).send('Animal not found');
    }
};
