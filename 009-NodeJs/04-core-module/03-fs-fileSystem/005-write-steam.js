/*
* @Author: Administrator
* @Date:   2020-07-04 15:24:32
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-04 16:00:21
*/
const fs = require('fs')

const ws = fs.createWriteStream('./005.txt');

ws.write('hehe');//1.

ws.on('finish',()=>{//监听事件，当写完时
	console.log('write done')
})
ws.on('close',()=>{//监听事件，当end关闭时
	console.log('closed ...')
})

ws.end();//2