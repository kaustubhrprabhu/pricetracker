const { User } = require('../models/user.model.js');
const { Product } = require('../models/product.model.js')
const { errorHandler } = require('../utils/error.js');

const test = (req, res) => {
    res.json({ message: 'API is working' });
}

const getAll = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'Access forbidden'));
    }

    try {
        const users = await User.find({}).sort({ name: 1 });
        return res.json(users);
    } catch (err) {
        return next(err)
    }
}

const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        return res.json({ message: 'User has been signout' });
    } catch (err) {
        return next(err);
    }
}

const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
    }

    if (req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return next(errorHandler(404, 'User not found'));
            }
            await Product.deleteMany({ email: user.email });
            await user.deleteOne();
            return res.status(200).json({ message: 'User has been deleted' });
        } catch (err) {
            return next(err);
        }
    }

    try {
        await Product.deleteMany({ email: req.user.email });
        await User.findByIdAndDelete(req.params.id);
        return res.clearCookie('access_token').json({ message: 'User has been deleted' });
    } catch (err) {
        return next(err);
    }
}

module.exports = { test, getAll, signout, deleteUser }