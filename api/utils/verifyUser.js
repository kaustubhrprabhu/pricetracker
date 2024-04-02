const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error.js');
const { User } = require('../models/user.model.js')

const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const validUser = await User.findById(user.id);
        if (!validUser) {
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        return next();
    } catch (err) {
        return next(errorHandler(401, 'Unauthorized'));
    }
}

module.exports = { verifyToken }