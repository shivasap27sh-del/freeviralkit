const fs = require('fs');
const path = require('path');

const filesToPatch = [
  "src/app/about/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/creator-gear/page.tsx",
  "src/app/page.tsx",
  "src/app/privacy-policy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/youtube-channel-name-generator/layout.tsx",
  "src/app/youtube-description-generator/layout.tsx",
  "src/app/youtube-hashtag-generator/layout.tsx",
  "src/app/youtube-shorts-idea-generator/layout.tsx",
  "src/app/youtube-tags-generator/layout.tsx",
  "src/app/youtube-title-generator/layout.tsx"
];

let modifiedCount = 0;

filesToPatch.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Skip if it already has twitter:
  if (content.includes('twitter: {')) return;
  
  // Try to find openGraph to insert before it
  const ogIndex = content.indexOf('openGraph: {');
  if (ogIndex === -1) return;
  
  // Extract title
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  
  if (titleMatch && descMatch) {
    const title = titleMatch[1];
    const desc = descMatch[1];
    
    const twitterString = `twitter: {\n    card: 'summary_large_image',\n    title: '${title.replace(/'/g, "\\'")}',\n    description: '${desc.replace(/'/g, "\\'")}',\n  },\n  `;
    
    content = content.slice(0, ogIndex) + twitterString + content.slice(ogIndex);
    
    fs.writeFileSync(fullPath, content, 'utf8');
    modifiedCount++;
    console.log(`Patched ${relPath}`);
  }
});

console.log(`Total patched: ${modifiedCount}`);
