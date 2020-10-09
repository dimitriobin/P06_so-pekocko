const {
    body
} = require('express-validator');

exports.inputValidation = (req, res, next) => {
    [
        // username must be an email
        body('username').isEmail().normalizeEmail(),
        // password must be at least 5 chars long
        body('password').isLength({
            min: 8
        }).trim().escape()
    ]
};