const express = require('express');
const cageController = require('../controllers/cageController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, cageController.getAllCages);
router.get('/:id', verifyToken, cageController.getCageById);
router.post('/', verifyToken, cageController.createCage);
router.put('/:id', verifyToken,cageController.updateCageById);
router.delete('/:id', verifyToken, cageController.deleteCageById);
router.get('/:id/animals', verifyToken, cageController.getAnimalsByCageId);

module.exports = router;
