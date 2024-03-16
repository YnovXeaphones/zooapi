const express = require('express');
const zooController = require('../controllers/zooController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/createZoo', zooController.createZoo);
router.put('/updateZoo', verifyToken, zooController.updateZoo);
router.delete('/deleteZoo', verifyToken, zooController.deleteZoo);

module.exports = router;
