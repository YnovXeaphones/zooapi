const { User } = require('../model/indexModel');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt.config');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { mail, password, zooId } = req.body;

    try {
        const user = await User.findOne({ where: { mail, zooId } });

        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userId: user.id },
                jwtConfig.jwtSecret,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token: token });
        } else {
            res.status(401).send({ message: 'Invalid mail or password' });
        }
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while trying to log in', error: error.message });
    }
};
