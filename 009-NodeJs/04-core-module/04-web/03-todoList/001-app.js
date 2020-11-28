/*
* @Author: Administrator
* @Date:   2020-07-04 17:35:44
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-06 11:52:10
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	//1.获取请求地址
	const filePath = req.url;//不能处理携带参数的请求
	const urlParse = url.parse(filePath,true);//可以拿到?后面的东西
	const pathname = urlParse.pathname;

	if(pathname == '/' || pathname == '/index.html'){
		//处理静态资源
		const fliename = path.normalize(__dirname+'/static/index.html');
		//2.根据文件地址读取文件
		fs.readFile(fliename,{encoding:'utf-8'},(err,data)=>{
			if(err){
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/html;charset=utf-8');
				res.end('<h1>请求的地址出错啦!</h1>')
			}else{
				const extname = path.extname(filePath);
				mimeType = mime[extname];
				res.statusCode = 200;
				res.setHeader('Content-Type', mimeType+';charset=utf-8');
				res.end(data)
			}
		})
	}else if(pathname == '/add'){
		console.log('add ...')
	}else{
		const fliename = path.normalize(__dirname+'/static/'+pathname);
		//2.根据文件地址读取文件
		fs.readFile(fliename,{encoding:'utf-8'},(err,data)=>{
			if(err){
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/html;charset=utf-8');
				res.end('<h1>请求的地址出错啦!</h1>')
			}else{
				const extname = path.extname(filePath);
				mimeType = mime[extname];
				res.statusCode = 200;
				res.setHeader('Content-Type', mimeType+';charset=utf-8');
				res.end(data)
			}
		})
	}

});


server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://127.0.0.1:3000');
})