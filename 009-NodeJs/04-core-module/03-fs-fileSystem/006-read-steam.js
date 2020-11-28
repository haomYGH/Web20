/*
* @Author: Administrator
* @Date:   2020-07-04 15:55:57
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-04 16:02:31
*/
const fs = require('fs')

const rs = fs.createReadStream('./005.txt');

//读取文件
rs.on('data',data=>{
	console.log(data)
})

//读取完毕
rs.on('end',()=>{
	console.log('read end')
})
