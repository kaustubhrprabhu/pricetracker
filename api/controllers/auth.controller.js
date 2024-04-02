const { User } = require('../models/user.model.js');
const { errorHandler } = require('../utils/error.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        // return res.status(400).json({ message: 'All fields are required' });
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json({ message: 'Signup successful' });
    } catch (err) {
        return next(err);
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(errorHandler(400, 'All fields are required'))
    }

    try {
        const validUser = await User.findOne({ email });
        if (validUser) {
            const validPassword = await bcrypt.compare(password, validUser.password);
            if (validPassword) {
                const token = jwt.sign({
                    id: validUser._id,
                    email: validUser.email,
                    isAdmin: validUser.isAdmin,
                }, process.env.JWT_SECRET);

                const { password: pass, ...rest } = validUser._doc;

                return res.status(200).cookie('access_token', token, {
                    httpOnly: true
                }).json(rest);
            }
        }
        return next(errorHandler(400, 'Invalid credentials'));
    } catch (err) {
        return next(err);
    }
}

module.exports = { signup, signin }