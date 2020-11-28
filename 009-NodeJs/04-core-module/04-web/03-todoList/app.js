/*
* @Author: Administrator
* @Date:   2020-07-04 17:35:44
* @Last Modified by:   haom
* @Last Modified time: 2020-07-07 00:50:57
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const swig  = require('swig');
const querystring = require('querystring')

const mime = require('./mime.json');
const { get,add,del } = require('./module/item.js');

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
	}else if(pathname == '/add'){
		//1.定义变量用来存数据
		let body = '';
		//2.监听data事件
		req.on('data',(chunk)=>{
			body += chunk;
		})
		//3.监听end事件,数据读取完毕
		req.on('end',()=>{
			// console.log(body);
			// 将body参数转化为对象
			const query = querystring.parse(body);
			// console.log(query)
			//将任务添加到后台数据中
			add(query.task)
			.then(data=>{
				res.end(JSON.stringify({
					code:0,
					message:'添加任务成功',
					data:data
				}))
			})
			.catch(err=>{
				res.end(JSON.stringify({
					code:1,
					message:'添加任务失败'
				}))
			})			
		})		
	}else if(pathname == '/del'){
		//1.获取参数信息(get请求方式,可以通过地址栏urlParse中的query来拿到id)
		// console.log(urlParse);
		const id = urlParse.query.id;
		//2.根据参数中的id，删除后台对应数据
		del(id)
		.then(data=>{
			//3.返回删除信息
			res.end(JSON.stringify({
				code:0,
				message:'删除任务成功',
			}))
		})
		.catch(err=>{
			res.end(JSON.stringify({
				code:1,
				message:'删除失败'
			}))
		})
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