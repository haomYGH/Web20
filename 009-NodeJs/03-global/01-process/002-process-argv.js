/*
* @Author: Administrator
* @Date:   2020-07-03 09:24:48
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 09:28:38
*/
// process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数
// 作用：用来构建带参数的工具(了解就行)
console.log(process.argv);
/* 
//终端操作
	node 002-process-argv.js kz
//输出
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\gitee\\Web20\\NodeJs\\03-global\\01-process\\002-process-argv.js',
  'kz'
]

//后面加参数的作用：可以用来创建项目目录。midirsync