const express = require('express');
const zooController = require('../controllers/zooController');

const router = express.Router();

router.get('/', zooController.getAllZoos);
router.get('/:id', zooController.getZooById);
router.post('/', zooController.createZoo);
router.put('/:id', zooController.updateZooById);
router.delete('/:id', zooController.deleteZooById);

module.exports = router;
