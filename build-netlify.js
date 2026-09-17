const fs = require('fs');
const path = require('path');

const root = __dirname;
const output = path.join(root, 'dist');
const publicFiles = [
  'index.html',
  'controller.html',
  'firebase-config.js',
  '_redirects',
];
const assetDirs = ['public', 'static'];

if (path.dirname(output) !== root) {
  throw new Error('La carpeta de salida debe permanecer dentro del proyecto.');
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const filename of publicFiles) {
  fs.copyFileSync(path.join(root, filename), path.join(output, filename));
}

for (const dirname of assetDirs) {
  const assetsSource = path.join(root, dirname);
  const assetsOutput = path.join(output, dirname);
  if (fs.existsSync(assetsSource)) {
    fs.cpSync(assetsSource, assetsOutput, { recursive: true });
  }
}

console.log(`Netlify: ${publicFiles.length} archivos y recursos preparados en dist/`);
