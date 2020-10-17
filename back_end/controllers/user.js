'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const fsPromises = fs.promises;
require('dotenv').config();
const User = require('../models/User');
const Sauce = require('../models/Sauce');
const Report = require('../models/Report');



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
                message: 'User saved.'
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
            return res.status(404).json({
                error: 'User not found'
            });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(validPass => {
            if (!validPass) {
                return res.status(401).json({
                    error: 'Wrong password.'
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

exports.readUser = (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user){
            res.status(404).send('User not found');
        }
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).send(error);
    })
};

//Three case, if only email, if only password and if twice
exports.updateUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashedPass => {
        const user = {
            email: req.body.email,
            password: hashedPass
        };
        User.updateOne({_id: req.params.id}, {
            ...user,
            _id: req.params.id
        })
        .then(user => {
            res.status(201).json({
                message: 'User updated.',
                user
            });
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        })
    })
    .catch(error => {
        res.status(400).json({
            error
        });
    })
};

exports.deleteUser = (req, res, next) => {
    User.findOne({
        _id: req.params.id
    })
    .then(user => {
        if(!user){
            res.status(404).send('User not found');
        }
        Sauce.find({userId: req.params.id})
        .then(sauces => {
            sauces.forEach(sauce => {
                Sauce.updateOne(sauce, {userId:'000000000000000000000000000000'})
                .then(updatedSauce => console.log(updatedSauce))
                .catch(err => { res.status(500).send(err)})
            })
            user.deleteOne({
                _id: req.params.id
            })
            //remove deleted user
            .then(deletedUser => {
                res.status(200).json({
                    message: 'User deleted.',
                    deletedUser
                });
            })
            .catch(error => {
                res.status(500).send(error);
            })
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

//return .txt file with e-mail and list of sauces (full infos)
exports.exportUser = (req, res, next) => {
    const dataFile = `./userDatas/${req.params.id}.json`
    User.findOne({_id: req.params.id})
    .then(user => {
        Sauce.find({userId: req.params.id})
        .then(sauces => {
            if (sauces.length === 0) {
                res.send('You have no sauce in our database !')
            }
            fsPromises.writeFile(dataFile, sauces)
            .then(() => {
                res.status(201).download(dataFile, 'vos_données_personnelles.json', err => {
                    if (err) {
                        res.send(err);
                    }
                    fs.unlink(dataFile, err => {
                        if (err) {
                            res.send(err);
                        }
                    });
                });
            })
            .catch(err => {
                res.status(404).send(err);
            })
        })
        .catch(err => {
            res.status(404).send(err);
        })
    })
    .catch(err => {
        res.status(404).send(err);
    })
};

exports.reportUser = (req, res, next) => {
    Report.findOne({itemId: req.body.itemId})
    .then(report => {
        if (report) {
            res.send('A report already exist.')
        }
        const newReport = new Report({
            itemId: req.body.itemId,
            type: req.body.type,
            status: 'pending'
        })
        newReport.save()
        .then(() => {
            res.status(202).send('A report was created, we will deal with it as soon as possible.');
        })
        .catch(err => {
            res.status(400).send(err)
        })
    })
    .catch(err => {
        res.status(404).send('Sauces not found.')
    })
};