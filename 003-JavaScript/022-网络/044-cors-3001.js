var http = require('http');

var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
	// 设置允许访问的源
	res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3000');
	// res.setHeader('Access-Control-Allow-Origin','*');
	//设置允许的访问的响应头信息
	res.setHeader("Access-Control-Expose-Headers",'Date,Connection,Kuazhu-Test');
	//设置响应头字段信息
	// res.setHeader("Content-Type",'text/plain');
	// res.setHeader("Kuazhu-Test",'Kuazhu-content-Test');



	// console.log(req.method)
	if(req.url == '/favicon.ico'){
		res.end('ok')
	}

	if(req.method == 'POST'){
		var body = '';
		req.on('data',function(chunk){
			body += chunk
		})
		req.on('end',function(){
			// console.log(body);
			res.end(body)
		})
	}else if(req.method == 'GET'){
		// console.log(req.url)
		if(req.url.search(/\?/) != -1){
			var parm = url.parse(req.url,true).query;
			// console.log(parm);
			var objToJSON = JSON.stringify(parm)
			res.end(objToJSON)
		}else{
			var filePath = './' + req.url;
			fs.readFile(filePath,function(err,data){
				if(err){
					res.statusCode = 404;
					res.end('Not Found!!!');
				}else{
					res.end(data);
				}
			})
		}
	}
	


	// res.end('ok');
});
server.listen(3001,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3001');
});
