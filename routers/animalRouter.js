const express = require('express');
const animalController = require('../controllers/animalController');

const router = express.Router();

router.get('/', animalController.getAllAnimals);
router.get('/:id', animalController.getAnimalById);
router.post('/', animalController.createAnimal);
router.put('/:id', animalController.updateAnimalById);
router.delete('/:id', animalController.deleteAnimalById);

module.exports = router;
