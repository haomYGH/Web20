var http = require('http');

var fs = require('fs');

var server = http.createServer(function(req,res){
	// console.log(req.url)
	if(req.url == '/favicon.ico'){
		res.end('ok')
	}
	var filePath = './' + req.url;
	fs.readFile(filePath,function(err,data){
		if(err){
			res.statusCode = 404;
			res.end('Not Found!!!');
		}else{
			res.end(data);
		}
	})


	// res.end('ok');
});
server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000');
});
