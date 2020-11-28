/*
* @Author: Administrator
* @Date:   2020-07-04 16:03:38
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-04 16:33:10
*/
const http = require('http');

const hostname = '192.168.43.81';
const port = 3000;

const server = http.createServer((req,res)=>{
	console.log(req.url);
	res.end('ok')
});

server.listen(port,hostname,function(){
	console.log(`Server running at http://${hostname}:${port}/`)
})