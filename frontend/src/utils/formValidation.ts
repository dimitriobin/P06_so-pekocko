import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const addSauceSchema = z.object({
  name: z.string().min(3),
  manufacturer: z.string().min(3),
  description: z.string(),
  mainPepper: z.string().min(2),
  imageUrl: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  heat: z.number().min(1).max(5)
});

export type AddSauceSchema = z.infer<typeof addSauceSchema>;
