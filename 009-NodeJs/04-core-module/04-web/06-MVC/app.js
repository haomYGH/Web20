/*
* @Author: Administrator
* @Date:   2020-07-04 17:35:44
* @Last Modified by:   haom
* @Last Modified time: 2020-07-08 20:03:06
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const swig  = require('swig');//插件
const querystring = require('querystring')
const mime = require('./mime.json');//插件


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
				// mode[action] && mode[action](req,res,args);//法1
				mode[action] && mode[action](...[req,res].concat(args));//法2
				// mode[action] && mode[action].apply(null,[req,res].concat(args));//apply第2个参数是数组,但是接收时会自动展开成参数列表
			}
			catch(e){
				console.log(e)
			}
		}

	}
});


server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://127.0.0.1:3000');
})