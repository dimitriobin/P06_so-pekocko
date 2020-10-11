const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.signup = (req, res, next) => {
        bcrypt.hash(req.body.password, 10)
        .then(hashedPass => {
            const user = new User({
                email: req.body.email,
                password: hashedPass
            });
            user.save()
            .then(user => {
                res.status(201).json({
                    message: 'Utilisateur créé !'
                });
            })
            .catch(error => {
                res.status(400).json({
                    error
                });
            })
        })
    .catch(error => {
        res.status(500).json({
            error
        });
    })
};


exports.login = (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé'
                });
            }
            bcrypt.compare(req.body.password, user.password)
            .then(validPass => {
                if (!validPass) {
                    return res.status(401).json({
                        error: 'Mot de passe incorrect !'
                    });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign({
                            userId: user._id
                        },
                        process.env.TOKEN_SECRET, {
                            expiresIn: '24h'
                        }
                    )
                });
            })
            .catch(error => {
                res.status(500).json({
                    error
                });
            })
        })
    .catch(error => {
        res.status(500).json({
            error
        });
    })
};