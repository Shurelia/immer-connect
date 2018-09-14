import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies)
];

function getConfig(format, declaration = false) {
  return {
    input: 'src/index.tsx',
    output: {
      exports: 'named',
      file: `dist/immerContext.${format}.js`,
      name: 'immerContext',
      format,
      sourcemap: true
    },
    external,
    plugins: [
      resolve(),
      typescript({
        tsconfig: 'tsconfig.json',
        typescript: require('typescript'),
        tsconfigOverride: { declaration },
        clean: true
      })
    ]
  };
}

const config = [getConfig('cjs'), getConfig('esm', true)];

export default config;
