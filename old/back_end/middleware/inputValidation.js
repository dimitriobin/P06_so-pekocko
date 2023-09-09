"use strict";
const Joi = require("joi");

const strongPasswordRegex = new RegExp(
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
);

exports.registerValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string()
      .min(8)
      .max(16)
      .pattern(strongPasswordRegex)
      .trim()
      .required(),
  }).with("email", "password");

  const { error } = schema.validate({ ...req.body });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};

exports.sauceInputValidation = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().trim().required(),
    name: Joi.string().required(),
    manufacturer: Joi.string().required(),
    description: Joi.string().required(),
    mainPepper: Joi.string().required(),
    heat: Joi.number().min(1).max(10).required(),
    likes: Joi.number(),
    dislikes: Joi.number(),
    usersLiked: Joi.array(),
    usersDisliked: Joi.array(),
    imageUrl: Joi.any(),
  });

  // const sauceObject = req.file
  //   ? {
  //       ...JSON.parse(req.body.sauce),
  //       imageUrl: `${req.protocol}://${req.get("host")}/images/${
  //         req.file.filename
  //       }`,
  //     }
  //   : {
  //       ...req.body,
  //     };
  const { error } = schema.validate({ ...req.body });
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};
