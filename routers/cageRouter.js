const express = require('express');
const cageController = require('../controllers/cageController');

const router = express.Router();

router.get('/', cageController.getAllCages);
router.get('/:id', cageController.getCageById);
router.post('/', cageController.createCage);
router.put('/:id', cageController.updateCageById);
router.delete('/:id', cageController.deleteCageById);

module.exports = router;
