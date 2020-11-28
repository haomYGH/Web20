/*
* @Author: haom
* @Date:   2020-06-05 13:43:07
* @Last Modified by:   haom
* @Last Modified time: 2020-06-29 23:15:15
*/
var http = require('http');
var fs = require('fs');

var server = http.createServer((req,res)=>{
	// console.log(req.url);
	var filePath = "./" + req.url;
	fs.readFile(filePath,function(err,date){
		if(err){
			res.statusCode = 404;//如果请求成功，但请求地址错误，需要改变状态
			res.end('not found!!!');
		}else{
			// res.statusCode = 200;//可以不设置，只要请求成功就是200
			res.end(date);
		}
	});
});

server.listen(3000,'127.0.0.1',function(){
	console.log('Server running at http://127.0.0.1:3000/')
})