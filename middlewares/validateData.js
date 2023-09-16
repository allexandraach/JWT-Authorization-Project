const util = require('util');

const bcrypt = require('bcrypt');

const User = require('../models/users');

const testUser = {
    username: 'test',
    password: 'test123'
};

// converts bcrypt.compare fct, which uses a callback, into a promise
const validatePassword = util.promisify(bcrypt.compare);

const validateData = async (req, res, next) => {

    if (req.header('Authorization')) {
        // if user has token, skip validating user credentials
        next();

    } else {

        const user = await User.findOne({ username: testUser.username });
        const passwordMatch = await validatePassword(testUser.password, user.password);

        try {

            if (user.length === 0 || !passwordMatch) {
                return res.status(401).json({ error: 'Invalid username or password' });

            } else {
                // attach to the request object for later middleware to use// 
                req.user = user;
                next();
            };

        } catch (error) {
            // log error for debugging
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });

        }

    }

}

module.exports = validateData;