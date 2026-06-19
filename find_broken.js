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
const links = new Set();
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/(?:href=|href:\s*)["'](\/[^"']+)["']/g);
  for(const m of matches) {
    links.add(m[1]);
  }
});
const arr = Array.from(links);
arr.forEach(l => {
  let parts = l.split('/');
  if(parts.length > 2 && parts[1] === 'blog' && parts[2] !== 'page') {
    if(!fs.existsSync('src/app/blog/posts/' + parts[2] + '.ts')) {
      console.log('Broken blog link:', l);
    }
  } else {
    let checkPath = 'src/app' + l;
    if(!fs.existsSync(checkPath) && l !== '/' && !l.startsWith('/#')) {
      console.log('Broken internal link:', l);
    }
  }
});
