const http = require('http')

const server = http.createServer((req,res)=>{
    //简单请求跨域
    res.setHeader("access-Control-Allow-Origin","http://localhost:8080");
    //返回值
    res.end(JSON.stringify(['learn React']))
})

server.listen(3000,'127.0.0.1',function(){
    console.log("Server running at http://127.0.0.1:3000");
})