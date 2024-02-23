const { User } = require('../model/indexModel');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt.config');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { mail, password } = req.body;

    try {
        const user = await User.findOne({ where: { mail: mail } });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { zooId: user.zooId, access: user.access },
                jwtConfig.jwtSecret,
                { expiresIn: '1h' }
            );

            res.json({ token: token });
        } else {
            res.status(401).send({ message: 'Invalid mail or password' });
        }
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while trying to log in', error: error.message });
    }
};
