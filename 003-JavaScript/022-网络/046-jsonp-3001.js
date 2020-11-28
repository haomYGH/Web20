var http = require('http');

var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
	var parm = url.parse(req.url,true).query;
	console.log(parm);
	var handleBack = parm.getData;
	var data = '{"name":"Tom","age":18}'
	res.end(handleBack+'('+data+')');
	
});
server.listen(3001,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3001');
});


