// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    singletons: {
        homepage: singleton({
            label: 'Homepage',
            path: 'src/content/homepage/index',
            schema: {
                heroHeading: fields.text({ label: 'Hero Heading' }),
                heroHeadingHighlight: fields.text({ label: 'Hero Heading Highlight' }),
                heroSubheading: fields.text({ label: 'Hero Subheading', multiline: true }),
                heroBackgroundImage: fields.image({
                    label: 'Hero Background Image',
                    directory: 'src/assets/hero-images',
                    publicPath: '@/assets/hero-images',
                }),
            },
        }),
        settings: singleton({
            label: 'Settings',
            path: 'src/content/settings/index',
            schema: {
                logo: fields.image({
                    label: 'Logo',
                    directory: 'src/assets/logo',
                    publicPath: '@/assets/logo',
                    validation: {
                        isRequired: true,
                    },
                }),
            },
        }),
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.markdoc({ label: 'Content' }),
            },
        }),
    },
});