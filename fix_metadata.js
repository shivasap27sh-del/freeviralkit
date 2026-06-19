const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

function truncateString(str, maxLen) {
  if (str.length <= maxLen) return str;
  const trimmed = str.substring(0, maxLen);
  // Find last space
  const lastSpaceIndex = trimmed.lastIndexOf(' ');
  if (lastSpaceIndex > maxLen - 15) {
    return trimmed.substring(0, lastSpaceIndex);
  }
  return trimmed;
}

const files = walk('src/app');

let filesModified = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // For page.tsx files, template adds " | FreeViralKit" (14 chars)
  // So base title max is 46.
  // For blog posts (which don't use the template directly in their title property, but layout adds it? Let's assume max 46 just to be safe)
  const maxTitleLen = 46;
  const maxDescLen = 155;

  // Replace titles
  content = content.replace(/title:\s*['"]([^'"]+)['"]/g, (match, title) => {
    if (title.length > maxTitleLen) {
      changed = true;
      const newTitle = truncateString(title, maxTitleLen).trim();
      return `title: '${newTitle.replace(/'/g, "\\'")}'`;
    }
    return match;
  });

  // Replace descriptions
  content = content.replace(/description:\s*['"]([^'"]+)['"]/g, (match, desc) => {
    if (desc.length > maxDescLen) {
      changed = true;
      const newDesc = truncateString(desc, maxDescLen).trim();
      return `description: '${newDesc.replace(/'/g, "\\'")}'`;
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Total files modified: ${filesModified}`);
