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
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}
const files = walk('src');
const images = new Set();
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/src=["'](\/[^"']+)["']/g);
  for(const m of matches) {
    images.add(m[1]);
  }
});
images.forEach(img => {
  let p = 'public' + img;
  if (!fs.existsSync(p)) {
    console.log('Broken local image:', img);
  }
});
