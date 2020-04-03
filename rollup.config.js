
import  buble from 'rollup-plugin-buble';
import  babel from 'rollup-plugin-babel';

export default {
    input: './src/main.js',
    output: [
        {
            file: './dist/tooljs.esm.js',
            format: 'esm',
        },
        {
            file: './dist/tooljs.common.js',
            format: 'cjs',
        },
        {
            file: './dist/tooljs.js',
            format: 'umd',
            name: 'tooljs'
        },
    ],
    plugins: [
        buble(),
        babel({
          exclude: 'node_modules/**'
        })
    ]
}