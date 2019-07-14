const copy = require('recursive-copy');

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
    error &&
      console.error('[Copy failed]', `src: ${src}, dest: ${dest}`, error);
  });
});
