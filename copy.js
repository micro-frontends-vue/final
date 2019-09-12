const fs = require('fs');
const copy = require('recursive-copy');

if (!fs.existsSync('docs')) {
  fs.mkdirSync('docs');
}

const task = [
  {
    src: 'applications/entry/dist',
    dest: 'docs',
  },
  {
    src: 'applications/typescript/dist',
    dest: 'docs/typescript',
  },
  {
    src: 'applications/javascript/dist',
    dest: 'docs/javascript',
  },
];

task.forEach(({ src, dest }) => {
  copy(src, dest, (error) => {
    console.log('[Copy]', `src: ${src}, dest: ${dest},`, error || 'success.');
  });
});
