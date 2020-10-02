const Sauce = require('../models/Sauce');

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
        delete req.body._id;
        const sauce = new Sauce({
            ...req.body
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
        await Sauce.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
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
};