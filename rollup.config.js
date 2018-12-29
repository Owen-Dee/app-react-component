// rollup-plugin-uglify: 压缩js代码
import { uglify } from 'rollup-plugin-uglify';
// rollup-plugin-babel: 可以方便的使用 javascript 的新特性
import babel from 'rollup-plugin-babel';
// rollup-plugin-node-resolve: rollup默认无法处理外部模块，也就是说无法解析打包从npm上下载使用的包，使用这个插件可以帮助我们使用
import resolve from 'rollup-plugin-node-resolve';
// rollup-plugin-commonjs: npm中的大多数包都是以CommonJS模块的形式出现的,要在rollup中使用必须先转为ES6语法
import commonjs from 'rollup-plugin-commonjs';
// rollup-plugin-postcss: 提取样式文件（sass 或者 less 等）添加浏览器前缀 以及压缩
// 注意如果要使用 .sass .scss 类型样式，需要先安装 node-sass
import postcss from 'rollup-plugin-postcss';
// postcss-modules: 样式模块化
import postcssModules from 'postcss-modules';
// rollup-plugin-url: 文件加载插件(图片)
import url from "rollup-plugin-url";
import progress from 'rollup-plugin-progress';

// postcss plugins
// postcss-simple-vars：可以使用Sass风格的变量(e.g. myColor: #fff;，color:myColor;)而不是冗长的CSS语法(e.g. :root {--myColor: #fff}，color: var(--myColor))
import simplevars from 'postcss-simple-vars';
// postcss-nested: 允许使用嵌套规则
import nested from 'postcss-nested';
// cssnano: 压缩，减小输出CSS文件大小
import cssnano from 'cssnano';

const path = require('path');
const cssExportMap = {};

const config = [{
    input: 'src/App.jsx', // 入口文件地址
    external: ['react', 'antd'], // 告诉rollup不要将此react,antd打包,而作为外部依赖
    output: {
        file: 'dist/app.js', // 输出的文件 (如果没有这个参数，则直接输出到控制台)
        format: 'cjs', // cjs – CommonJS，适用于 Node 和 Browserify/Webpack (包括: amd umd cjs es iife)
        name: 'sample-app',
        globals: { // 任何定义在这里的模块添加到外部依赖,告诉rollup 全局变量React即是react
            react: "React",
            antd: "antd"
        },
        sourcemap: true  //App.map.jsx文件，方便调试
    },
    plugins: [
        progress({
            clearLine: false
        }),
        url({
            limit: 10 * 1024,
            exclude: 'node_modules/**',
            fileName: "[name][hash][extname]",
            sourceDir: path.join(__dirname, "src"),
            emitFiles: true
        }),
        babel({
            exclude: "node_modules/**"
        }),
        postcss({
            plugins: [
                simplevars(),
                nested(),
                cssnano(),
                postcssModules({
                    getJSON(id, exportTokens) {
                        cssExportMap[id] = exportTokens;
                    }
                })
            ],
            getExportNamed: false,
            getExport(id) {
                return cssExportMap[id];
            },
            extract: 'dist/styles.css'
        }),
        resolve({
            jsnext: true,  // 该属性是指定将Node包转换为ES2015模块
            main: true,  // Default: true  main 和 browser 属性将使插件决定将那些文件应用到bundle中
            browser: true, // Default: false
            preferBuiltins: false  // whether to prefer built-in modules (e.g. `fs`, `path`) or local ones with the same names
        }),
        commonjs(),
        uglify()
    ],
}];

export default config;