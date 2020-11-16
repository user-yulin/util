
import  buble from 'rollup-plugin-buble';
import  babel from 'rollup-plugin-babel';
import  packageJson from './package.json';

export default {
    input: './src/main.js',
    output: [
        {
            file: `./dist/${packageJson.name}.esm.js`,
            format: 'esm',
        },
        {
            file: `./dist/${packageJson.name}.common.js`,
            format: 'cjs',
        },
        {
            file: `./dist/${packageJson.name}.js`,
            format: 'umd',
            name: packageJson.name
        },
    ],
    plugins: [
        buble(),
        babel({
          exclude: 'node_modules/**'
        })
    ]
}