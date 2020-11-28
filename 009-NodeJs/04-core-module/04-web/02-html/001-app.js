/*
* @Author: Administrator
* @Date:   2020-07-04 17:04:26
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-06 09:32:47
*/
const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = '192.168.43.81';
const port = 3000;

const server = http.createServer((req,res)=>{
	const filePath = path.normalize(__dirname+'/static/'+req.url);
	console.log(filePath);
	fs.readFile(filePath,'utf8',(err,data)=>{
		if(err){
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/html;charset="UTF-8"')
			res.end('<h1>某找到</h1>');
		}else{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html;charset="UTF-8"')
			res.end(data);
		}
	})
});

server.listen(port,hostname,function(){
	console.log(`Server running at http://${hostname}:${port}/`)
})