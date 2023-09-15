const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = '4fe324f66481ef1f4a57a3cb98a3ca0528e63e8afd0161120397ca93a9b495d6';

const mongoose = require('mongoose');
const User = require('./models/users');

// connect to mongodb
const usersDbURI = process.env.usersDB_URI;
mongoose.connect(usersDbURI)
    .then(() => app.listen(PORT))
    .catch((err) => console.log(err));

// middleware to parse JSON requests
app.use(express.json());

const testUser = {
    username: 'test',
    password: 'test123'
};

app.get('', (req, res) => {
    res.send('Home');
});

app.get('/login', async (req, res) => {

    const user = await User.find({username: testUser.username});

    console.log(user);

    if (user.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
    } else {
        return res.status(200).json({ message: 'Login successful' });
    }

})

