const fs = require('fs');
const path = require('path');
const imgDir = 'public/images';
const keep = new Set(['metadata_funnel.png', 'seo_dashboard.png']);

function walk(dir) {
  let res = [];
  const list = fs.readdirSync(dir);
  list.forEach(f => {
    f = dir + '/' + f;
    if (fs.statSync(f).isDirectory()) res = res.concat(walk(f));
    else if (f.endsWith('.tsx')) res.push(f);
  });
  return res;
}

const tsxFiles = walk('./src/app');
tsxFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /\/images\/([^\"]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keep.add(match[1]);
  }
});

const allImgs = fs.readdirSync(imgDir);
let deleted = 0;
allImgs.forEach(img => {
  if (!keep.has(img)) {
    try {
      fs.unlinkSync(path.join(imgDir, img));
      deleted++;
    } catch(e) {}
  }
});

console.log('Deleted ' + deleted + ' unused images');
