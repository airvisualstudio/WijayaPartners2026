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