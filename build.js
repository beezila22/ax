const fs = require('fs');
const archiver = require('archiver');

// Hakikisha umesha-install archiver: npm install archiver --save-dev

const output = fs.createWriteStream('core.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log('✅ core.zip imeundwa! Size: ' + archive.pointer() + ' bytes');
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);

// Ongeza folders na files zako muhimu
archive.directory('commands/', 'commands');
archive.directory('database/', 'database');
archive.directory('lib/', 'lib');
archive.file('config.js', { name: 'config.js' });
archive.file('index.js', { name: 'index.js' });
archive.file('package.json', { name: 'package.json' });
archive.file('Procfile', { name: 'Procfile' });
archive.file('app.json', { name: 'app.json' });
archive.file('README.md', { name: 'README.md' });

// Maliza
archive.finalize();

console.log('📦 Zipping core...');
