import { z } from 'zod';

export const createItemSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    price: z.number().positive(),
    quantity: z.number().int().min(0),
  }),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;