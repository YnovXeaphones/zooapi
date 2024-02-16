const express = require('express');
const zooController = require('../controllers/zooController');

const router = express.Router();

router.post('/createZoo', zooController.createZoo)
router.put('/updateZoo', zooController.updateZoo);
router.delete('/deleteZoo', zooController.deleteZoo);

module.exports = router;
