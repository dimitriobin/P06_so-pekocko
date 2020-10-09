const {
    body,
    validationResult
} = require('express-validator');


exports.validation = [
    // username must be an email
    body('email').isEmail().withMessage('Veuillez remplir une adresse mail valide').normalizeEmail(),
    // password must be at least 5 chars long
    body('password').not().isEmpty().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/).withMessage('Votre mdp doit contenir au moins une majuscule, une minuscule et un chiffre').isLength({
        min: 8
    }).withMessage('Votre mdp doit contenir au minimum 8 caractères')
];

exports.validationResult = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    } else {
        next();
    }
};