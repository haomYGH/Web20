/*
* @Author: haom
* @Date:   2020-06-29 22:43:25
* @Last Modified by:   haom
* @Last Modified time: 2020-06-29 23:09:32
*/
const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
	console.log(req.url);
	const filePath = "./" + req.url;
	fs.readFile(filePath,'utf8',function(err,data){
		if(err){
			res.statusCode = 404;
			res.end('not found!!')
		}else{
			res.end(data)
		}
	})
})

server.listen(3000,'localhost',function(){
	console.log('Server running at localhost:3000/')
})