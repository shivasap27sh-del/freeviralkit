const fs = require('fs');
const path = require('path');
const dir = 'src/app/blog/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix escaped backticks \ replacing with \
  content = content.replace(/\\\/g, '\');
  
  // Fix weird extra backticks like: publishDate: "2026-05-30",\,
  content = content.replace(/publishDate: "[^"]+",\,?\\n/g, '');
  content = content.replace(/publishDate: "[^"]+",\/g, '');
  
  // Some files might have \, at the end of content:
  // If the content is already properly closed with \
  // let's just make sure there are exactly two backticks for the content field.
  
  fs.writeFileSync(filePath, content);
}
console.log('Done');
