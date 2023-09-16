const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const mongoose = require('mongoose');

// connect to mongodb
const usersDbURI = process.env.usersDB_URI;
mongoose.connect(usersDbURI)
    .then(() => app.listen(PORT))
    .catch((err) => console.log(err));

// middleware to parse JSON requests
app.use(express.json());

// import middlewares
const validateData = require('./middlewares/validateData');
const handleToken = require('./middlewares/handleToken');
const loginUser = require('./middlewares/loginUser');


app.get('', (req, res) => {
    res.send('Login Page');
});

// used GET instead of POST because user credentials are hard-coded on the server
app.get('/login', [validateData, handleToken, loginUser]);

app.get('/dashboard', (req, res) => {
    res.send('Login Successful');
});


