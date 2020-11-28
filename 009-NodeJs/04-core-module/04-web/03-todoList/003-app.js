/*
* @Author: Administrator
* @Date:   2020-07-04 17:35:44
* @Last Modified by:   haom
* @Last Modified time: 2020-07-06 23:14:10
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const swig  = require('swig');

const mime = require('./mime.json');
const { get } = require('./module/item.js');

const server = http.createServer((req,res)=>{
	//1.获取请求地址
	const filePath = req.url;//不能处理携带参数的请求
	const urlParse = url.parse(filePath,true);//可以拿到?后面的东西
	const pathname = urlParse.pathname;

	if(pathname == '/' || pathname == '/index.html'){
		//获取首页数据并返回
		get()
		.then(data=>{
			const fliePath = path.normalize(__dirname+'/static/index.html');
			const template = swig.compileFile(fliePath);
			const html = template({
				data:data
			})
			// console.log(data);
			// console.log(html)
			res.end(html);
		})
		//处理静态资源
	}else if(pathname == '/add'){
		console.log('add ...')
	}else{
		const fliePath = path.normalize(__dirname+'/static/'+pathname);
		//2.根据文件地址读取文件
		fs.readFile(fliePath,{encoding:'utf-8'},(err,data)=>{
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