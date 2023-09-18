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

app.get('', (req, res) => {
    res.send('Login Page');
});

// used GET instead of POST because user credentials are hard-coded on the server
app.get('/login', [validateData, handleToken], (req, res) => {
    req.authenticated = true;
    res.redirect('/dashboard');

});

app.get('/dashboard', (req, res) => {

    if (req.authenticated) {
        res.send('Dashboard page');
    } else {
        // user accessed the route directly from the url; will prevent direct access like this
        res.redirect('/login');
    }
});

