const express = require('express');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config();

// Connect MongoDB at default port 27017.
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

// Deal with CORS policy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// body parsers
app.use(express.json());
app.use(express.urlencoded());

// Serve static assets
app.use('/images', express.static(path.join(__dirname, 'images')));

// Get routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;