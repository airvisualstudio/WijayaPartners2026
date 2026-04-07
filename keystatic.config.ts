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
        contact: singleton({
            label: 'Contact Page',
            path: 'src/content/contact/index',
            schema: {
                heading: fields.text({ label: 'Heading' }),
                subheading: fields.text({ label: 'Subheading', multiline: true }),
                email1: fields.text({ label: 'Email 1' }),
                email2: fields.text({ label: 'Email 2' }),
                phone: fields.text({ label: 'Phone' }),
                hours: fields.text({ label: 'Business Hours' }),
                address: fields.text({ label: 'Address', multiline: true }),
                mapsEmbedUrl: fields.text({ label: 'Google Maps Embed URL (src only)' }),
                twitter: fields.text({ label: 'Twitter URL' }),
                github: fields.text({ label: 'Github URL' }),
                linkedin: fields.text({ label: 'LinkedIn URL' }),
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
        teams: collection({
            label: 'Teams',
            slugField: 'name',
            path: 'src/content/teams/*',
            format: { contentField: 'biodata' },
            schema: {
                name: fields.slug({ name: { label: 'Full Name' } }),
                role: fields.text({ label: 'Role/Position' }),
                profileImage: fields.image({
                    label: 'Profile Image',
                    directory: 'src/assets/teams',
                    publicPath: '@/assets/teams',
                }),
                education: fields.markdoc({ label: 'Education' }),
                expertise: fields.markdoc({ label: 'Expertise' }),
                biodata: fields.markdoc({ label: 'Detailed Biodata' }),
                email: fields.text({ label: 'Email Address' }),
                linkedin: fields.text({ label: 'LinkedIn URL' }),
            },
        }),
    },
});