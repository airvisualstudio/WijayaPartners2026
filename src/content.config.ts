import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homepage = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx,yaml,yml}", base: "src/content/homepage" }),
    schema: z.object({
        heroHeading: z.string().optional(),
        heroHeadingHighlight: z.string().optional(),
        heroSubheading: z.string().optional(),
        heroBackgroundImage: z.string().optional(),
    }),
});

const settings = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx,yaml,yml}", base: "src/content/settings" }),
    schema: z.object({
        logo: z.string().optional(),
    }),
});

export const collections = {
    homepage,
    settings,
};
