import { Request, Response } from "express";
import {
  createSauce,
  deleteSauce,
  readSauce,
  readSauces,
  updateSauce,
} from "../services/api/sauces";
import {
  createDislike,
  createLike,
  deleteDislike,
  deleteLike,
  findDislike,
  findLike,
} from "../services/api/likes";

export async function createOneSauce(req: Request, res: Response) {
  try {
    const sauce = await createSauce(req.body);
    res.status(201).json(sauce);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readAllSauces(req: Request, res: Response) {
  try {
    const sauces = await readSauces();
    res.json(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readOneSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const sauce = await readSauce(id);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(404).json({ error: error, message: "Sauce not found" });
  }
}

export async function updateOneSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;

    const sauce = await updateSauce(req.body, id);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(404).json({ error: error, message: "Sauce not found" });
  }
}

export async function deleteOneSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;

    await deleteSauce(id);
    res.status(200).json({ message: "sauce deleted" });
  } catch (error) {
    res.status(404).json({ error: error, message: "Sauce not found" });
  }
}

export async function likeSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const { userId }: { userId?: string } = req.body;

    if (!userId) throw new Error("please provide the user id");

    const alreadyLiked = await findLike(id, userId);
    const alreadyDisliked = await findDislike(id, userId);

    if (!alreadyLiked && !alreadyDisliked) {
      const like = await createLike(id, userId);
      res.status(201).json(like);
    } else {
      throw new Error(
        `the User with ID ${userId} has already liked the sauce with ID ${id}`
      );
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function unLikeSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const { userId }: { userId?: string } = req.body;

    if (!userId) throw new Error("please provide the user id");

    const like = await findLike(id, userId);

    if (!like) throw new Error("No like found on this sauce by this user");

    await deleteLike(like.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function dislikeSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const { userId }: { userId?: string } = req.body;

    if (!userId) throw new Error("please provide the user id");

    const alreadyLiked = await findLike(id, userId);
    const alreadyDisliked = await findDislike(id, userId);

    if (!alreadyLiked && !alreadyDisliked) {
      const dislike = await createDislike(id, userId);
      res.status(201).json(dislike);
    } else {
      throw new Error(
        `the User with ID ${userId} has already liked the sauce with ID ${id}`
      );
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function unDislikeSauce(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const { userId }: { userId?: string } = req.body;

    if (!userId) throw new Error("please provide the user id");

    const dislike = await findDislike(id, userId);

    if (!dislike) throw new Error("No like found on this sauce by this user");

    await deleteDislike(dislike.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
}
