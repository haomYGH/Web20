/*
* @Author: Administrator
* @Date:   2020-07-04 17:35:44
* @Last Modified by:   haom
* @Last Modified time: 2020-07-08 11:16:48
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
	const reqPath = req.url;
	// console.log(reqPath);
	const urlParse = url.parse(reqPath,true);
	// console.log(urlParse);//Url{}
	const pathname = urlParse.pathname;


	/*
		约定：
			以/static/开头的请求都是静态资源
			不以static请求的是具体的路由

			路由的格式：
				/Controller/action/arg1/arg2/arg3...
	 */
	
	if(pathname.startsWith('/static/')){
		// console.log(pathname.startsWith('/static/'));//判断是否以 /static/ 开头的路由
		//I.处理静态资源 /static/ 
		const filePath = path.normalize(__dirname+'/'+pathname);
		//2.根据文件地址读取文件
		fs.readFile(filePath,{encoding:'utf-8'},(err,data)=>{
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
	//II.处理路由
	else{
		//解析路由
		const paths = pathname.split('/');
		// console.log(paths);
		const controller = paths[1] || "Index";
		const action = paths[2] || "index";
		const args = paths.splice(3);
		// console.log(controller)
		// console.log(action)
		// console.log(args)
		if(controller != 'favicon.ico'){
			//	约定：
			//		所有的Controller文件都保存在 ./Controller/目录下面

			const mode = require(path.normalize(__dirname+'/Controller/'+controller));//js>json>报错
			// console.log(mode);
			try{
				// mode[action] && mode[action](req,res,args);
				// mode[action] && mode[action](...[req,res].concat(args));
				mode[action] && mode[action].apply(null,[req,res].concat(args));//apply第2个参数是数组,但是接收时会自动展开成参数列表
			}
			catch(e){
				console.log(e)
			}
		}

	}
/*
	if(pathname == '/' || pathname == '/index.html'){
		//获取首页数据并返回
		get()
		.then(data=>{
			const filePath = path.normalize(__dirname+'/static/index.html');
			const template = swig.compileFile(filePath);
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
		const filePath = path.normalize(__dirname+'/static/'+pathname);
		//2.根据文件地址读取文件
		fs.readFile(filePath,{encoding:'utf-8'},(err,data)=>{
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
*/
});


server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://127.0.0.1:3000');
})