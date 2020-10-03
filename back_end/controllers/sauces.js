const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = async (req, res, next) => {
    try {
        const allSauces = await Sauce.find();
        res.status(200).json(allSauces);
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

exports.getOneSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({
            _id: req.params.id
        });
        res.status(200).json(sauce);
    } catch (error) {
        res.status(404).json({
            error
        });
    }
};

exports.createOneSauce = async (req, res, next) => {
    try {
        const sauceObject = JSON.parse(req.body.sauce);
        delete req.body._id;
        const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        await sauce.save()
        res.status(201).json({
            message: 'Vous avez ajouté une nouvelle sauce !'
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

exports.updateOneSauce = async (req, res, next) => {
    try {
        const sauceObject = req.file ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...req.body
        };
        await Sauce.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        });
        res.status(200).json({
            message: 'Votre sauce a été modifiée !'
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};

exports.deleteOneSauce = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({
            _id: req.params.id
        });
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
            try {
                await Sauce.deleteOne({
                    _id: req.params.id
                })
                res.status(200).json({
                    message: 'Cette sauce a été supprimée !'
                });
            } catch (error) {
                res.status(400).json({
                    error
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

exports.likeOneSauce = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.params);
        const sauce = await Sauce.findOne({
            _id: req.params.id
        });
        // console.log(sauce);
        switch (req.body.like) {
            case 1:
                if (!sauce['usersLiked'].includes(req.body.userId)) {
                    if (sauce['usersDisliked'].includes(req.body.userId)) {
                        sauce['usersLiked'].push(req.body.userId);
                        sauce['usersDisliked'].splice(sauce['usersDisliked'].indexOf(req.body.userId), 1);
                    } else {
                        sauce['usersLiked'].push(req.body.userId);
                    }
                }
                break;

            case 0:
                if (sauce['usersLiked'].includes(req.body.userId)) {
                    sauce['usersLiked'].splice(sauce['usersLiked'].indexOf(req.body.userId), 1);
                } else if (sauce['usersDisliked'].includes(req.body.userId)) {
                    sauce['usersDisliked'].splice(sauce['usersDisliked'].indexOf(req.body.userId), 1);
                }
                break;

            case -1:
                if (!sauce['usersDisliked'].includes(req.body.userId)) {
                    if (sauce['usersLiked'].includes(req.body.userId)) {
                        sauce['usersDisliked'].push(req.body.userId);
                        sauce['usersLiked'].splice(sauce['usersLiked'].indexOf(req.body.userId), 1);
                    } else {
                        sauce['usersDisliked'].push(req.body.userId);
                    }
                }
                break;
            default:
                return new Error();
                break;
        }
        sauce['dislikes'] = sauce['usersDisliked'].length;
        sauce['likes'] = sauce['usersLiked'].length;

        console.log(sauce);

        await Sauce.updateOne({
            _id: req.params.id
        }, sauce);

        res.status(200).json({
            message: 'Votre sauce a été modifiée !'
        });

    } catch (error) {
        res.status(400).json({
            error
        });
    }
};