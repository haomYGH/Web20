/*
* @Author: Administrator
* @Date:   2020-07-02 11:52:20
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-02 11:56:20
*/
require('./002-m.js');//执行对应的文件并且返回该文件对应的modeule.exports对象

console.log(global.str);//global类似于window全局对象
console.log(str);//也可以简写