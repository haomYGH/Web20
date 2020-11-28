/*
* @Author: Administrator
* @Date:   2020-07-04 17:35:44
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-06 09:32:06
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	//处理静态资源
	//1.获取请求地址
	const filePath = req.url;
	// console.log('filePath::',filePath);
	const fliename = path.normalize(__dirname+'/static/'+filePath);
	// console.log('fliename::',fliename);
	//2.根据文件地址读取文件
	fs.readFile(fliename,{encoding:'utf-8'},(err,data)=>{
		if(err){
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/html;charset=utf-8');
			res.end('<h1>请求的地址出错啦!</h1>')
		}else{
			// console.log(data);
			//根据不同的文件设置文档类型
			//根据不同的后缀名设置文档类型
			// .css text/css
			// .html text/html
			// 获取文件后缀名
			const extname = path.extname(filePath);
			// console.log('extname::',extname);
			mimeType = mime[extname];
			// console.log('mimeType::',mimeType)

			res.statusCode = 200;
			res.setHeader('Content-Type', mimeType+';charset=utf-8');
			res.end(data)
		}
	})



	// res.end('good');
});


server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://127.0.0.1:3000');
})