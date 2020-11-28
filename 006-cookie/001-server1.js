/*
* @Author: haom
* @Date:   2020-06-05 13:01:25
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-18 11:00:27
*/

var http = require('http');

var fs = require('fs');

var server = http.createServer(function(req, res){
	// res.setHeader('Set-Cookie','username=haom');//设置cookie
	// res.setHeader('Set-Cookie','age=18;Max-Age='+10);//设置cookie过期事件,(注意分号隔开)

	console.log(req.url);
	var filePath = "./" + req.url;
	fs.readFile(filePath,function(err,date){
		if(err){
			res.statusCode = 404;
			res.end('not found!!!');
		}else{
			res.end(date);
		}
	});

	// res.end('Hello');
});

server.listen(3000, '127.0.0.1', function(){
	console.log("Server1 running at http://127.0.0.1:3000/");
});