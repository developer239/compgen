import replace from '@rollup/plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import progress from 'rollup-plugin-progress'
import typescript from 'rollup-plugin-typescript2'

export default ['bin', 'index'].map((name) => ({
  input: `./src/${name}.ts`,
  output: {
    file: `./lib/${name}.js`,
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    preserveShebangs(),
    replace({
      'ROLLUP_PUBLIC_TOKEN': process.env.ROLLBAR_TOKEN,
    }),
    progress(),
    typescript({
      clean: true,
      tsconfig: 'tsconfig.build.json',
    }),
    commonjs({ ignore: ['conditional-runtime-dependency'] }),
    copy({
      targets: [{ src: 'src/templates*', dest: './lib' }],
    }),
  ],
}))
