'use strict'
const router = require('express').Router();

const {
    signup,
    login
} = require('../controllers/user');

const {
    registerValidation
} = require('../middleware/inputValidation');

router.post('/signup', registerValidation, signup);
router.post('/login', registerValidation, login);

module.exports = router;