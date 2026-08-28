import { access, readFile } from 'node:fs/promises';

const requiredFiles = [
  'index.html',
  'dist/index.html',
  'dist/app.js',
  'dist/styles.css',
  'dist/core/scheduler.js',
  'dist/core/defaults.js',
  'dist/test/scheduler.test.js',
];

for (const file of requiredFiles) {
  await access(file);
}

const rootIndex = await readFile('index.html', 'utf8');
const distIndex = await readFile('dist/index.html', 'utf8');

if (!rootIndex.includes('./dist/app.js') || !rootIndex.includes('./dist/styles.css')) {
  throw new Error('Root index must load committed static assets from ./dist.');
}

if (rootIndex.includes('type="module"') || distIndex.includes('type="module"')) {
  throw new Error('Entrypoints must use a classic script so they work as simple static files without module import restrictions.');
}

if (!distIndex.includes('./app.js') || !distIndex.includes('./styles.css')) {
  throw new Error('dist/index.html must be self-contained with relative local assets.');
}

console.log('static files verified');
