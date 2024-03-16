const animalService = require('../services/animalService');
const cageService = require('../services/cageService');

exports.getAllAnimals = async (req, res) => {
    if (!req.access.toLowerCase().includes('r')) {
        return res.status(403).send('Unauthorized');
    }
    const zooId = req.zooId;
    try {
        const cages = await cageService.getAllCages(zooId);
        let animals = [];

        for (const cage of cages) {
            const cageAnimals = await animalService.getAnimalsByCageId(cage.id);
            animals = animals.concat(cageAnimals);
        }

        res.json(animals);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAnimalById = async (req, res) => {
    if (!req.access.toLowerCase().includes('r')) {
        return res.status(403).send('Unauthorized');
    }
    const zooId = req.zooId;
    const id = parseInt(req.params.id);

    try {
        const animal = await animalService.getAnimalById(id);
        const cage = await cageService.getCageById(animal.cageId, zooId)

        if (!cage || !animal) {
            return res.status(404).send('Animal Not found');
        }

        res.json(animal);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createAnimal = async (req, res) => {
    if (!req.access.toLowerCase().includes('c')) {
        return res.status(403).send('Unauthorized');
    }
    const zooId = req.zooId;
    const { name, specie, diet, cageId } = req.body;

    try {
        const cage = await cageService.getCageById(cageId, zooId);
        if (!cage) {
            return res.status(404).send('Cage Not found');
        }

        const animal = await animalService.createAnimal(name, specie, diet, cageId);
        
        res.status(201).json(animal);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateAnimalById = async (req, res) => {
    if (!req.access.toLowerCase().includes('c')) {
        return res.status(403).send('Unauthorized');
    }
    const zooId = req.zooId;
    const id = parseInt(req.params.id);
    const { name, specie, diet, cageId } = req.body;

    try {
        const animal = await animalService.getAnimalById(id);
        let cage = await cageService.getCageById(animal.cageId, zooId)

        if (!cage || !animal) {
            return res.status(404).send('Animal Not found');
        }
        
        if (cageId) {
            cage = await cageService.getCageById(cageId, zooId);

            if (!cage) {
                return res.status(404).send('Cage Not found');
            }
        }

        const updatedAnimal = await animalService.updateAnimalById(id, name, specie, diet, cageId);
        if (updatedAnimal) {
            res.json(updatedAnimal);
        } else {
            res.status(404).send('Animal not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteAnimalById = async (req, res) => {
    if (!req.access.toLowerCase().includes('d')) {
        return res.status(403).send('Unauthorized');
    }
    const zooId = req.zooId;
    const id = parseInt(req.params.id);

    try {
        const animal = await animalService.getAnimalById(id);
        const cage = await cageService.getCageById(animal.cageId, zooId);

        if (!cage || !animal) {
            return res.status(404).send('Animal Not found');
        }

        const success = await animalService.deleteAnimalById(id);
        if (success) {
            res.status(200).send('Animal deleted');
        } else {
            res.status(404).send('Animal not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
