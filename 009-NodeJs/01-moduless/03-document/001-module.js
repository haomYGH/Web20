//证明：一个文件就是一个模块,这个模块的本质其实就是一个函数,每个模块都有自己的属性
console.log(arguments);

//打印此函数
console.log(arguments.callee+'');
/*
function (exports, require, module, __filename, __dirname) {
//证明：一个文件就是一个模块,这个模块的本质其实就是一个函数,每个模块都有自己的属性
console.log(arguments);

//打印此函数
console.log(arguments.callee+'')
}
 */