const fs = require('fs');

const tools = [
  'youtube-title-generator',
  'youtube-description-generator',
  'youtube-tags-generator',
  'youtube-hashtag-generator',
  'youtube-channel-name-generator',
  'youtube-shorts-idea-generator',
  'youtube-script-generator',
  'youtube-hook-generator',
  'youtube-chapter-generator',
  'youtube-thumbnail-generator',
  'youtube-topic-researcher',
  'youtube-seo-grader'
];

tools.forEach(t => {
  const p = 'src/app/' + t + '/page.tsx';
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    
    // Add import if not present
    if (!c.includes('import RelatedTools')) {
      // Find the last import
      const lastImportIndex = c.lastIndexOf('import ');
      const endOfLastImport = c.indexOf('\n', lastImportIndex);
      c = c.slice(0, endOfLastImport + 1) + "import RelatedTools from '@/components/RelatedTools';\n" + c.slice(endOfLastImport + 1);
    }

    // Remove existing CTA blocks using regex
    // Looks for {/* Related Tools CTA */} or {/* Bottom CTA */} and removes the block up to the next </section> or </div>... wait, this is tricky.
    // Better to just look for existing RelatedTools component, if not present, inject it before `        </section>`
    
    if (!c.includes('<RelatedTools')) {
      // remove existing related ctas manually by replacing their known strings? Let's just append it before `        </section>\n      </main>`
      
      const insertion = `\n          <RelatedTools currentToolPath="/${t}" />\n`;
      c = c.replace('        </section>\n      </main>', insertion + '        </section>\n      </main>');
    }

    fs.writeFileSync(p, c);
    console.log('Patched', p);
  }
});
