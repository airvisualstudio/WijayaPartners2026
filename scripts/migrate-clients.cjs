// scripts/migrate-clients.cjs
const fs = require('fs');
const path = require('path');

const publicClientsDir = path.join(__dirname, '../public/clients');
const assetsClientsDir = path.join(__dirname, '../src/assets/clients');
const contentClientsDir = path.join(__dirname, '../src/content/clients');

// Helper to clean up client name
function cleanClientName(filename) {
    const basename = path.basename(filename, path.extname(filename));
    
    // Custom mappings for known names
    if (basename === 'nusasarana') return 'Nusa Sarana';
    if (basename === 'pasirucing') return 'Pasir Ucing';
    if (basename === 'gdmerdeka') return 'Gedung Merdeka';
    
    // Standard cleaning: replace hyphens/underscores, capitalize words
    return basename
        .split(/[-_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function migrate() {
    if (!fs.existsSync(publicClientsDir)) {
        console.error(`Source directory does not exist: ${publicClientsDir}`);
        process.exit(1);
    }

    // Ensure parent directories exist
    fs.mkdirSync(assetsClientsDir, { recursive: true });
    fs.mkdirSync(contentClientsDir, { recursive: true });

    const files = fs.readdirSync(publicClientsDir);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

    let count = 0;
    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (!imageExtensions.includes(ext)) {
            return; // Skip non-image files
        }

        const slug = path.basename(file, ext).toLowerCase().replace(/[^a-z0-9-_]/g, '-');
        const cleanName = cleanClientName(file);

        // Define target paths
        const clientAssetDir = path.join(assetsClientsDir, slug);
        const targetImageName = `logo${ext}`;
        const targetImagePath = path.join(clientAssetDir, targetImageName);
        const jsonFilePath = path.join(contentClientsDir, `${slug}.json`);

        // Create target asset folder for this specific client
        fs.mkdirSync(clientAssetDir, { recursive: true });

        // Copy image
        const sourceImagePath = path.join(publicClientsDir, file);
        fs.copyFileSync(sourceImagePath, targetImagePath);

        // Write Keystatic json entry
        const entryData = {
            name: cleanName,
            logo: `@/assets/clients/${slug}/${targetImageName}`
        };
        fs.writeFileSync(jsonFilePath, JSON.stringify(entryData, null, 2), 'utf-8');

        console.log(`Migrated: ${cleanName} (${file}) -> ${slug}.json`);
        count++;
    });

    console.log(`\nSuccessfully migrated ${count} client logos to Keystatic schema!`);
}

migrate();
