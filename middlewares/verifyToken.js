const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt.config');

const parseToken = (decoded) => {
    return {
        zooId: decoded.zooId,
        access: decoded.access,
    };
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).send({ message: "No token found" });

    try {
        const decoded = jwt.verify(token, jwtConfig.jwtSecret);
        const tokenData = parseToken(decoded);
        req.zooId = tokenData.zooId;
        req.access = tokenData.access;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid Token' });
    }
}

module.exports = verifyToken;