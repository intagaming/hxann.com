import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publication_date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    cover_url: z.string().optional(),
  }),
});

const takes = defineCollection({
  schema: z.object({
    title: z.string(),
    publication_date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

export const collections = { blog, takes };
