/*
* @Author: Administrator
* @Date:   2020-06-30 08:51:58
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-30 08:57:40
*/
const http = require('http');

const server = http.createServer((req,res)=>{
	console.log(req.url);//服务器后面的请求地址
	res.end('只能字符串？')
});

server.listen(3000,'127.0.0.1',function(){
	console.log('Server running at http://127.0.0.1:3000/')
})