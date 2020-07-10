import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    { file: 'lib/index.cjs.js', format: 'cjs' },
    { file: 'lib/index.esm.js', format: 'esm' },
  ],
  external: ['prop-types', 'react', 'use-latest'],
  plugins: [babel({ babelHelpers: 'bundled' })],
};
