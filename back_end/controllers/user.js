const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hash
        })
        await user.save();
        try {
            res.status(201).json({
                message: 'Utilisateur créé !'
            });
        } catch (error) {
            res.status(400).json({
                error
            });
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};


exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(401).json({
                error: 'Utilisateur non trouvé'
            });
        }
        try {
            const validPass = await bcrypt.compare(req.body.password, user.password);
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
        } catch (error) {
            res.status(500).json({
                error
            });
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};