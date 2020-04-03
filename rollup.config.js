
import  buble from 'rollup-plugin-buble';
import  babel from 'rollup-plugin-babel';

export default {
    input: './src/main.js',
    output: [
        {
            file: './dist/helper.esm.js',
            format: 'esm',
        },
        {
            file: './dist/helper.common.js',
            format: 'cjs',
        },
        {
            file: './dist/helper.js',
            format: 'umd',
            name: 'helperjs'
        },
    ],
    plugins: [
        buble(),
        babel({
          exclude: 'node_modules/**'
        })
    ]
}