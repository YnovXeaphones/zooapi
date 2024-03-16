const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const userService = require('../services/userService');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).send({ message: "No token found" });

    try {
        const decoded = jwt.verify(token, jwtConfig.jwtSecret);
        const user = await userService.getUserByPK(decoded.userId);
        if (!user) {
            return res.status(401).send({ message: 'Invalid Token' });
        }
        req.userId = decoded.userId;
        req.zooId = user.zooId;
        req.access = user.access;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid Token' });
    }
}

module.exports = verifyToken;