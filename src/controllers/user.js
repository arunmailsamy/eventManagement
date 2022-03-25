const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');



const login = async (req, res, next) => {

    try {
        const token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET, { algorithm: 'HS512', expiresIn: '30m' });
        res.json({ token });
    } catch (err) {
        next(err);
    }

}