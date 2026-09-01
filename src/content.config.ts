// Starlight's own docs collection. Declaring it explicitly rather than
// letting Astro auto-generate one is what makes sidebar slugs, frontmatter
// validation, and the 404 route work.
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
