const express = require('express');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const toobusy = require('toobusy-js');
const rateLimit = require("express-rate-limit");
const slowDown = require('express-slow-down');
const app = express();
require('dotenv').config();

//////////////////////////////////////////////
// Connect MongoDB
//////////////////////////////////////////////
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

//////////////////////////////////////////////
// Deal with CORS policy
//////////////////////////////////////////////
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//////////////////////////////////////////////
// body parsers
//////////////////////////////////////////////
app.use(express.urlencoded({
    limit: "1kb"
}));
app.use(express.json({
    limit: "1kb"
}));


//////////////////////////////////////////////
// Serve static assets
//////////////////////////////////////////////
app.use('/images', express.static(path.join(__dirname, 'images')));

//////////////////////////////////////////////
// Secure the event-loop against DoS attacks
//////////////////////////////////////////////
app.use((req, res, next) => {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
    next();
    }
});


 
//////////////////////////////////////////////
// Create a rate limitation
//////////////////////////////////////////////
const sauceLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

const registerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5 // limit each IP to 100 requests per windowMs
});

//////////////////////////////////////////////
// Slow down each requests made back to back to discourage spamming the API
//////////////////////////////////////////////
const speedLimiter = slowDown({
  windowMs: 30 * 1000, // 30 sec
  delayAfter: 5, // allow 10 requests per 30 seconds, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
});

//////////////////////////////////////////////
// Set up a logger with morgan
//////////////////////////////////////////////
// log all errors to errors.log
app.use(morgan('common', {
    stream: fs.createWriteStream('./activity/errors.log', { flags: 'a' }),
    skip: function (req, res) { return res.statusCode < 400 }
  }));
   
// log all requests to access.log
app.use(morgan('common', {
stream: fs.createWriteStream('./activity/access.log', { flags: 'a' })
}));


//////////////////////////////////////////////
// Get routes
//////////////////////////////////////////////
app.use('/api/sauces', sauceLimiter, speedLimiter, saucesRoutes);
app.use('/api/auth', registerLimiter, speedLimiter, userRoutes);

module.exports = app;