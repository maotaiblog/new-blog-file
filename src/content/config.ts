import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('猫太博客'),
    readTime: z.string().default('5分钟'),
  }),
});

export const collections = {
  blog: blogCollection,
};
