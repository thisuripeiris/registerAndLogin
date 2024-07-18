const User = require("../models/user");
const { hashPassword, comparePassword } = require('../helpers/auth')

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //Check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        };
        //check if password is good
        if (!password || password.length > 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        //Check email
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            })
        };

        const hashedPassword = await hashPassword(password)
        //Create User in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    test,
    registerUser
};
