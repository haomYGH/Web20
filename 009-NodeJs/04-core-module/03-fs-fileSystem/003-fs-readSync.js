/*
* @Author: Administrator
* @Date:   2020-07-04 11:09:30
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-04 11:21:26
*/
//读文件  sync同步

const fs = require('fs')

/*
//逐步操作
	//1.打开文件
	const fd = fs.openSync('./test.txt','r');//'r': 打开文件用于读取。 如果文件不存在，则会发生异常。
	//2.读取文件
	const buf = Buffer.alloc(100);
	fs.readSync(fd,buf,0,50,0);//返回fd内容的长度
	// console.log(buf);
	//3.关闭文件
	fs.closeSync(fd);
*/	
//合并操作
const buf = fs.readFileSync('./test.txt',{flag:'r'});
console.log(buf.toString());