
import  buble from 'rollup-plugin-buble';
import  babel from 'rollup-plugin-babel';

export default {
    input: './src/main.js',
    output: [
        {
            file: './dist/tools.esm.js',
            format: 'esm',
        },
        {
            file: './dist/tools.common.js',
            format: 'cjs',
        },
        {
            file: './dist/tools.js',
            format: 'umd',
            name: 'tools'
        },
    ],
    plugins: [
        buble(),
        babel({
          exclude: 'node_modules/**'
        })
    ]
}