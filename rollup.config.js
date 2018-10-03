import fs from 'fs-extra';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies)
];

function getConfig(format) {
  const config = {
    input: 'src/index.tsx',
    output: {
      exports: 'named',
      file: `dist/immerConnect.${format}.js`,
      name: 'immerConnect',
      format,
      sourcemap: true
    },
    external,
    plugins: [
      resolve(),
      typescript({
        tsconfig: 'tsconfig.json',
        typescript: require('typescript')
      })
    ]
  };
  if (format === 'cjs') {
    config.plugins.push(declarationPlugin());
  }
  return config;
}

const config = [getConfig('cjs'), getConfig('esm')];

export default config;

const mainFile = './src/types.ts';
const extraFile = './src/typesInternal.ts';
const templateFile = './src/index.d.ts.template';
const decFile = './dist/index.d.ts';
const exportDeleteRegex = /^export\s/gm;
const importDeleteRegex = /^import\s.*?from \'.*?\';?\r?\n?/gms;
function declarationPlugin() {
  return {
    name: 'declaration-extra',
    generateBundle: writeDeclaration,
    watch: file => console.log(file)
  };
}

function writeDeclaration() {
  let dec = fs.readFileSync(templateFile, 'utf8');
  let main = fs.readFileSync(mainFile, 'utf8');
  main = main.replace(importDeleteRegex, '');
  let extra = fs.readFileSync(extraFile, 'utf8');
  extra = extra.replace(exportDeleteRegex, '');
  extra = extra.replace(importDeleteRegex, '');

  dec = dec + '\r\n' + main + '\r\n' + extra;

  if (!fs.pathExistsSync('./dist')) {
    fs.mkdirpSync('./dist');
  }

  fs.writeFileSync(decFile, dec, { flag: 'w+' });
  console.log('declaration bundled → dist/index.d.ts');
}
