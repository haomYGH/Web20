/*
* @Author: Administrator
* @Date:   2020-07-03 17:53:55
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-04 10:37:39
*/
//sync同步
const fs = require('fs');

//逐步进行
	//1.打开文件
	const fd = fs.openSync('./test.txt','a');
	//2.写
	fs.writeSync(fd,'hello ');
	//3.保持并关闭
	fs.closeSync(fd);

/*
//合并
//fs.writeFileSync(file, data[, options])
*/
//fs.writeFileSync(file, data[, options])
fs.writeFileSync('./test.txt','hello ',{flag:'a'});//这个函数在哪里找到的