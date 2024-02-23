const express = require('express');
const zooController = require('../controllers/zooController');

const router = express.Router();

router.post('/createZoo', zooController.createZoo)
router.put('/updateZoo', zooController.updateZooById);
router.delete('/deleteZoo', zooController.deleteZooById);

module.exports = router;
