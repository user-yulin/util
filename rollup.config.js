
import  buble from 'rollup-plugin-buble';
import  babel from 'rollup-plugin-babel';
import  packageJson from './package.json';
/** 
 * 下划线中划线转驼峰
*/
function toCamel(str){
    return String(str).replace(/[-|_](\w)/g, function($0, $1){ return $1.toUpperCase(); });
}

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
            name: toCamel(packageJson.name)
        },
    ],
    plugins: [
        buble(),
        babel({
          exclude: 'node_modules/**'
        })
    ]
}