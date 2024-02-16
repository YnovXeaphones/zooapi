const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt.config');

const parseToken = (decoded) => {

};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).send({ message: "No token found" });

    try {
        // Try to verify the token
        const decoded = jwt.verify(token, jwtConfig.jwtSecret);
        req.zooId, req.access = parseToken(decoded);
      } catch (err) {
        // If token is invalid or expired
        return res.status(401).send({ message: 'Invalid Token' });
      }

    return next();
}

module.exports = verifyToken;