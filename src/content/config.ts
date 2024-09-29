import { z, defineCollection } from 'astro:content';

const doc = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  doc,
};