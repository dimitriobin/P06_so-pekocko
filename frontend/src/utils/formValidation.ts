import { z } from 'zod';

export const addSauceSchema = z.object({
  name: z.string().min(3),
  manufacturer: z.string().min(3),
  description: z.string(),
  mainPepper: z.string().min(2),
  //   imageUrl: z.string(),
  heat: z.number().min(1).max(5)
});

export type AddSauceSchema = z.infer<typeof addSauceSchema>;
