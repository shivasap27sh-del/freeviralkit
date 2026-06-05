const fs = require('fs');
const path = require('path');
const imagesDir = 'public/images';
const files = fs.readdirSync(imagesDir);

function findImg(prefix) {
  const f = files.find(f => f.startsWith(prefix));
  return f ? '/images/' + f : null;
}

const mapping = {
  'youtube-channel-name-generator': [findImg('channel_name_hero'), findImg('channel_name_content')],
  'youtube-chapter-generator': [findImg('chapter_gen_hero'), findImg('chapter_gen_content')],
  'youtube-description-generator': [findImg('desc_gen_hero'), findImg('desc_gen_content')],
  'youtube-hashtag-generator': [findImg('hashtag_gen_hero'), findImg('hashtag_gen_content')],
  'youtube-hook-generator': [findImg('hook_gen_hero'), findImg('hook_gen_content')],
  'youtube-script-generator': [findImg('script_gen_1'), findImg('script_gen_2')],
  'youtube-seo-grader': ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200'],
  'youtube-shorts-idea-generator': ['https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200'],
  'youtube-tags-generator': ['https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200'],
  'youtube-thumbnail-generator': ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200', 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?q=80&w=1200'],
  'youtube-title-generator': ['https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?q=80&w=1200', 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=1200'],
  'youtube-topic-researcher': ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200'],
  'youtube-channel-name-generator-for-gaming': [findImg('gaming_name_gen'), findImg('gaming_abstract_1')],
  'youtube-description-generator-for-education': ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200'],
  'youtube-description-generator-for-tech': ['https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200', 'https://images.unsplash.com/photo-1531297172864-742d501dbbc5?q=80&w=1200'],
  'youtube-hashtag-generator-for-shorts': ['https://images.unsplash.com/photo-1521714161819-15534968fc5f?q=80&w=1200', 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1200'],
  'youtube-tags-generator-for-gaming': [findImg('gaming_abs_one'), 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200'],
  'youtube-title-generator-for-beauty': ['https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200', 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=1200'],
  'youtube-title-generator-for-cooking': ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200'],
  'youtube-title-generator-for-fitness': ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200', 'https://images.unsplash.com/photo-1517836357463-d25dfe09ce1e?q=80&w=1200'],
  'youtube-title-generator-for-gaming': ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200'],
  'youtube-title-generator-for-music': ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200'],
  'youtube-title-generator-for-tech': ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200'],
  'youtube-title-generator-for-travel': ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200'],
  'youtube-title-generator-for-vlogs': ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200', 'https://images.unsplash.com/photo-1527011045974-4bba30a1040f?q=80&w=1200']
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.tsx')) results.push(file);
  });
  return results;
}

const filesToProcess = walk('./src/app');

filesToProcess.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  const filename = path.basename(path.dirname(file));
  const mappingData = mapping[filename];
  
  if (mappingData) {
    const img1 = mappingData[0] || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200';
    const img2 = mappingData[1] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200';
    
    if (content.includes('/images/seo_dashboard.png')) {
      content = content.replace(/\/images\/seo_dashboard\.png/g, img1);
      modified = true;
    }
    
    if (content.includes('/images/metadata_funnel.png')) {
      content = content.replace(/\/images\/metadata_funnel\.png/g, img1);
      modified = true;
    }
    
    const iframeRegex = /<div className=\"my-12 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800\">\s*<iframe[^>]*><\/iframe>\s*<\/div>/g;
    
    if (iframeRegex.test(content)) {
      content = content.replace(iframeRegex, `<div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">\n                <Image src="${img2}" alt="SEO Graphic" width={1200} height={630} className="w-full h-auto object-cover" unoptimized={true} />\n              </div>`);
      modified = true;
    }
    
    if (modified && !content.includes("import Image from 'next/image'")) {
      content = "import Image from 'next/image';\n" + content;
    }
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log('Fixed ' + file);
    }
  }
});
