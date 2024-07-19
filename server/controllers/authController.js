const User = require("../models/user");
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('test is working');
};

// Register Endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name was entered
        if (!name) {
            return res.json({ error: 'Name is required' });
        }

        // Check if password is good
        if (!password || password.length < 6) {
            return res.json({ error: 'Password is required and should be at least 6 characters long' });
        }

        // Check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email is already taken' });
        }

        const hashedPassword = await hashPassword(password);

        // Create User in database
        const user = await User.create({ name, email, password: hashedPassword });

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);

        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        } else {
            res.json({ error: 'Password does not match' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
};
