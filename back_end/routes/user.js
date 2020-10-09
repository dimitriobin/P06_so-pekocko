const router = require('express').Router();

const {
    signup,
    login
} = require('../controllers/user');

const {
    inputValidation
} = require('../middleware/validation');

router.post('/signup', inputValidation, signup);
router.post('/login', inputValidation, login);

module.exports = router;