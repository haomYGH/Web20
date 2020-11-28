/*
* @Author: Administrator
* @Date:   2020-06-28 11:09:30
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-28 11:26:18
*/
const http = require('http')
const fs = require('fs')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
	// console.log(req.url);//在服务器端打印请求的地址
	let filePaht = './'+req.url;
	// readFile的第2个参数表示读取编码格式，如果未传递这个参数，表示返回Buffer字节数组 
	fs.readFile(filePaht,'utf8',(err, data) => {
	  if(err){
	  	res.end('Not Found!!')
	  }else{
	  	res.end(data)
	  }
	})
})

server.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}/`)
})