// scripts/generate-slides-index.js
// Run this script with: node scripts/generate-slides-index.js

const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, '../slides');
const outFile = path.join(__dirname, '../lib/slides-index.ts');

const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.md'));

const imports = files.map((file, i) => `import slide${i} from '../slides/${file}';`).join('\n');
const slidesArr = files.map((file, i) => `  { name: '${file.replace(/\.md$/, '')}', file: '${file}', import: slide${i} }`).join(',\n');

const content = `// This file is auto-generated by scripts/generate-slides-index.js\n${imports}\n\nexport const slidesIndex = [\n${slidesArr}\n];\n`;

fs.writeFileSync(outFile, content);
console.log('Generated slides-index.ts with', files.length, 'slides.');
