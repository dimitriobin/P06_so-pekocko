const router = require('express').Router();

const {
    signup,
    login
} = require('../controllers/user');

const {
    validation,
    validationResult
} = require('../middleware/validation');

router.post('/signup', validation, validationResult, signup);
router.post('/login', validation, validationResult, login);

module.exports = router;