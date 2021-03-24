"use strict";
const Sauce = require("../models/Sauce");
const s3 = require("../aws-config");

exports.createOneSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body,
    imageUrl: req.file ? req.file.location : null,
  });
  sauce
    .save()
    .then((response) => {
      console.log(response);
      res.status(201).json({ message: "Sauce saved" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.readAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      if (sauces.length <= 0) {
        return res.status(404).json({
          error: "No sauces to display",
        });
      } else {
        res.status(200).json(sauces);
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.readOneSauce = (req, res, next) => {
  Sauce.findById(req.params.id)
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) =>
      res.status(404).json({ error: error, message: "Sauce not found" }),
    );
};

exports.updateOneSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...req.body,
        imageUrl: req.file ? req.file.location : null,
      }
    : {
        ...req.body,
      };

  Sauce.findByIdAndUpdate(req.params.id, {
    ...sauceObject,
    _id: req.params.id,
  })
    .then((sauce) => {
      if (req.file && sauce.imageUrl !== null) {
        s3.deleteObject(
          {
            Bucket: "so-peckoko",
            Key: sauce.imageUrl.split(
              "https://so-peckoko.s3.eu-west-3.amazonaws.com/",
            )[1],
          },
          (err, data) => {
            if (err) {
              console.log(err, err.stack);
            } else {
              console.log(data);
            }
          },
        );
      }
      res.status(200).json({ message: "Sauce updated" });
    })
    .catch((error) =>
      res.status(404).send({ error, message: "Sauce not found" }),
    );
};

exports.deleteOneSauce = (req, res, next) => {
  Sauce.findById(req.params.id)
    .then((sauce) => {
      s3.deleteObject(
        {
          Bucket: "so-peckoko",
          Key: sauce.imageUrl.split(
            "https://so-peckoko.s3.eu-west-3.amazonaws.com/",
          )[1],
        },
        (err, data) => {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data);
          }
        },
      );
      Sauce.deleteOne({
        _id: req.params.id,
      })
        .then(() => {
          res.status(200).json({
            message: "Sauce deleted",
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })

    .catch((error) => {
      res.status(404).json({ error, message: "Sauce not found" });
    });
};

exports.likeOneSauce = (req, res, next) => {
  Sauce.findById(req.params.id)
    .then((sauce) => {
      switch (req.body.like) {
        // If it is a like
        case 1:
          // if this user doesn't already like the sauce,
          if (!sauce["usersLiked"].includes(req.body.userId)) {
            // and this user already dislike the sauce
            if (sauce["usersDisliked"].includes(req.body.userId)) {
              // the user's Id is removed from the dislike array and pushed into the like array
              sauce["usersDisliked"].splice(
                sauce["usersDisliked"].indexOf(req.body.userId),
                1,
              );
              sauce["usersLiked"].push(req.body.userId);
            } else {
              sauce["usersLiked"].push(req.body.userId);
            }
          }
          break;

        // if it's nolike/nodislike
        case 0:
          // If the user already like the sauce
          if (sauce["usersLiked"].includes(req.body.userId)) {
            // remove the user from the like array
            sauce["usersLiked"].splice(
              sauce["usersLiked"].indexOf(req.body.userId),
              1,
            );
            // if the user already dislike
          } else if (sauce["usersDisliked"].includes(req.body.userId)) {
            // remove the user from the dislike array
            sauce["usersDisliked"].splice(
              sauce["usersDisliked"].indexOf(req.body.userId),
              1,
            );
          }
          break;

        // if it's a dislike
        case -1:
          // if the user doesn't already dislike the sauce
          if (!sauce["usersDisliked"].includes(req.body.userId)) {
            // and the user already like the sauce
            if (sauce["usersLiked"].includes(req.body.userId)) {
              // remove the user from the like array and push the user in the dislike array
              sauce["usersLiked"].splice(
                sauce["usersLiked"].indexOf(req.body.userId),
                1,
              );
              sauce["usersDisliked"].push(req.body.userId);
            } else {
              sauce["usersDisliked"].push(req.body.userId);
            }
          }
          break;

        default:
          break;
      }
      // Set the number of likes and dislikes for this sauce to the length of each according array
      sauce["dislikes"] = sauce["usersDisliked"].length;
      sauce["likes"] = sauce["usersLiked"].length;

      Sauce.updateOne(
        {
          _id: req.params.id,
        },
        sauce,
      )
        .then(() => {
          res.status(200).json({
            message: "The sauce has been updated",
          });
        })
        .catch((err) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => res.status(404).json({ error }));
};
