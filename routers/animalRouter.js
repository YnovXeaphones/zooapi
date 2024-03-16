const express = require('express');
const animalController = require('../controllers/animalController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, animalController.getAllAnimals);
router.get('/:id', verifyToken, animalController.getAnimalById);
router.post('/', verifyToken, animalController.createAnimal);
router.put('/:id', verifyToken, animalController.updateAnimalById);
router.delete('/:id', verifyToken, animalController.deleteAnimalById);

module.exports = router;
