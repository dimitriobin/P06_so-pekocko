import { AddSauceSchema } from '../utils/formValidation';

export interface CreateSaucePayload extends AddSauceSchema {
  userId: number;
}

export interface Sauce {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  name: string;
  manufacturer: string;
  description: string;
  mainPepper: string;
  imageUrl: string;
  heat: number;
  likes: { user: { id: number; name: string } }[];
  dislikes: { user: { id: number; name: string } }[];
  _count: {
    likes: number;
    dislikes: number;
  };
}
