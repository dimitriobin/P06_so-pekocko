import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export async function createOneSauce(req: Request, res: Response) {
  try {
    const {
      name,
      manufacturer,
      description,
      mainPepper,
      imageUrl,
      heat,
      userId,
    } = req.body;
    const sauce = await prisma.sauce.create({
      data: {
        name,
        manufacturer,
        description,
        mainPepper,
        imageUrl,
        heat,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(201).json(sauce);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readAllSauces(req: Request, res: Response) {
  try {
    const sauces = await prisma.sauce.findMany();
    res.json(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readOneSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const sauce = await prisma.sauce.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(sauce);
  } catch (error) {
    res.status(404).json({ error: error, message: "Sauce not found" });
  }
}

export async function updateOneSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const {
      name,
      manufacturer,
      description,
      mainPepper,
      imageUrl,
      heat,
      userId,
    } = req.body;

    const sauce = await prisma.sauce.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        manufacturer,
        description,
        mainPepper,
        imageUrl,
        heat,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(200).json(sauce);
  } catch (error) {
    res.status(404).json({ error: error, message: "Sauce not found" });
  }
}

export async function deleteOneSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;

    await prisma.sauce.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "sauce deleted" });
  } catch (error) {
    res.status(404).json({ error: error, message: "Sauce not found" });
  }
}

// exports.likeOneSauce = (req, res, next) => {
//   Sauce.findById(req.params.id)
//     .then((sauce) => {
//       switch (req.body.like) {
//         // If it is a like
//         case 1:
//           // if this user doesn't already like the sauce,
//           if (!sauce["usersLiked"].includes(req.body.userId)) {
//             // and this user already dislike the sauce
//             if (sauce["usersDisliked"].includes(req.body.userId)) {
//               // the user's Id is removed from the dislike array and pushed into the like array
//               sauce["usersDisliked"].splice(
//                 sauce["usersDisliked"].indexOf(req.body.userId),
//                 1,
//               );
//               sauce["usersLiked"].push(req.body.userId);
//             } else {
//               sauce["usersLiked"].push(req.body.userId);
//             }
//           }
//           break;

//         // if it's nolike/nodislike
//         case 0:
//           // If the user already like the sauce
//           if (sauce["usersLiked"].includes(req.body.userId)) {
//             // remove the user from the like array
//             sauce["usersLiked"].splice(
//               sauce["usersLiked"].indexOf(req.body.userId),
//               1,
//             );
//             // if the user already dislike
//           } else if (sauce["usersDisliked"].includes(req.body.userId)) {
//             // remove the user from the dislike array
//             sauce["usersDisliked"].splice(
//               sauce["usersDisliked"].indexOf(req.body.userId),
//               1,
//             );
//           }
//           break;

//         // if it's a dislike
//         case -1:
//           // if the user doesn't already dislike the sauce
//           if (!sauce["usersDisliked"].includes(req.body.userId)) {
//             // and the user already like the sauce
//             if (sauce["usersLiked"].includes(req.body.userId)) {
//               // remove the user from the like array and push the user in the dislike array
//               sauce["usersLiked"].splice(
//                 sauce["usersLiked"].indexOf(req.body.userId),
//                 1,
//               );
//               sauce["usersDisliked"].push(req.body.userId);
//             } else {
//               sauce["usersDisliked"].push(req.body.userId);
//             }
//           }
//           break;

//         default:
//           break;
//       }
//       // Set the number of likes and dislikes for this sauce to the length of each according array
//       sauce["dislikes"] = sauce["usersDisliked"].length;
//       sauce["likes"] = sauce["usersLiked"].length;

//       Sauce.updateOne(
//         {
//           _id: req.params.id,
//         },
//         sauce,
//       )
//         .then(() => {
//           res.status(200).json({
//             message: "The sauce has been updated",
//           });
//         })
//         .catch((err) => {
//           res.status(500).json({ error });
//         });
//     })
//     .catch((error) => res.status(404).json({ error }));
// };
