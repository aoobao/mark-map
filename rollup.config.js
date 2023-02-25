import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
const outputDir = 'dist'
const outputList = ['esm', 'umd']

const commonPlugins = [json(), resolve(), commonjs()]

export default [
  {
    input: 'lib/index.ts',
    output: outputList.map(format => {
      return {
        name: 'MarkMap',
        file: `${outputDir}/index.${format}.js`,
        format
      }
    }),
    plugins: [
      ...commonPlugins,
      esbuild({
        tsconfig: 'tsconfig.build.json'
      })
    ]
  },
  {
    input: 'lib/index.ts',
    output: {
      file: `${outputDir}/index.d.ts`,
      format: 'es'
    },
    plugins: [...commonPlugins, dts()]
  }
]
