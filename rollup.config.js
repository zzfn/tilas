import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'

const env = process.env.NODE_ENV;
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default {
    input: 'components/index.ts',
    output: [
        {
            file: `lib/index${env === 'production' ? '.min' : ''}.cjs.js`,
            format: 'cjs',
            name: 'design',
        },
        {
            file: `lib/index${env === 'production' ? '.min' : ''}.esm.js`,
            format: 'esm',
            name: 'design',
        }
    ],
    // 将模块视为外部模块，不会打包在库中
    external: ['react', 'react-dom'],
    // 插件
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            babelHelpers: 'runtime',
            extensions,
            exclude: 'node_modules/**'
        }),
        typescript({tsconfig: './tsconfig.json'}),
        scss({
            output: 'lib/bundle.css',
            prefix: `@import "../../styles/response";`,
        }),
        copy({
            targets: [
                {src: ['components/styles/response-theme.scss'], dest: 'lib/style'},
            ]
        })
    ],
}
