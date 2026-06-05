const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove <Image ... />
    // We can use a regex to match the <Image tag and its attributes up to />
    // It might span multiple lines, but usually it's one line.
    content = content.replace(/<Image\s+[^>]*\/>/g, '');

    // Remove video iframe wrappers
    // Matches the div containing the iframe
    content = content.replace(/<div[^>]*aspect-video[^>]*>[\s\S]*?<iframe[\s\S]*?<\/iframe>[\s\S]*?<\/div>/g, '');

    // If there are standalone <iframe tags not in an aspect-video div:
    content = content.replace(/<iframe[\s\S]*?<\/iframe>/g, '');

    if (content !== original) {
        // Fix up empty lines left behind
        content = content.replace(/^\s*[\r\n]/gm, '\n');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Stripped media from:', filePath);
    }
}

processDirectory(path.join(__dirname, 'src/app'));
console.log('Done.');
