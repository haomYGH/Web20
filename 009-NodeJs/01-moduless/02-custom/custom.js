/*
* @Author: Administrator
* @Date:   2020-07-02 10:28:55
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-02 14:59:46
*/
//自定义模块的使用步骤
//1.下载安装(npm install jquery --save)
//2.引入
const $ = require('jquery');
//3.使用
console.log($);
console.log($+'');

//自定义模块的加载路径可以通过module.paths查看 
console.log(module.paths);
/*
[
  'D:\\gitee\\Web20\\NodeJs\\01-moduless\\02-custom\\node_modules',
]
 */