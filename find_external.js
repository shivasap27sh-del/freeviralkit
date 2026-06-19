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
const urls = new Set();
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/https?:\/\/[^\s)\"']+/g);
  if (m) m.forEach(x => urls.add(x));
});
console.log('External URLs:', Array.from(urls));
