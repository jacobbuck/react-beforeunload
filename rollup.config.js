import babel from 'rollup-plugin-babel';

export default {
  input: 'src/Beforeunload.js',
  output: {
    file: 'lib/Beforeunload.js',
    format: 'cjs',
  },
  external: ['prop-types', 'react'],
  plugins: [babel()],
};
