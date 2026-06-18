const fs = require('fs');
const path = require('path');
const dir = 'src/app/blog/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Let's remove any instances of publishDate: "...",`,
  // or publishDate: "...",`
  content = content.replace(/publishDate:\s*"[^"]+",\s*`,\s*\n?/g, '');
  content = content.replace(/publishDate:\s*"[^"]+",\s*`/g, '');
  
  // also fix `, followed by publishDate
  content = content.replace(/`,\s*publishDate:/g, '`,\npublishDate:');
  
  // we need to look for `content: ` and ensure it ends with `\n  date:`
  // If the file ends up with two backticks next to each other, fix it.
  content = content.replace(/`,\n\s*`,\n/g, '`,\n');
  
  fs.writeFileSync(filePath, content);
}
console.log('Done');
