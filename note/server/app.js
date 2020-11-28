/*
* @Author: Tom
* @Date:   2018-08-06 09:14:54
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 19:38:07
*/
//项目入口文件
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//启动数据库
mongoose.connect('mongodb://localhost:27017/note',{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	throw err
});

db.once('open',()=>{
	console.log('DB connected....');
});


const app = express();

//跨域设置  (响应头)
app.use((req,res,next)=>{
	res.append("Access-Control-Allow-Origin","*");
	// res.append("Access-Control-Allow-Credentials",true);//允许携带验证信息。(如cookie)
	res.append("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,X-File-Name"); 
	res.append("Set-Cookie", "HttpOnly;Secure;SameSite=Lax"); 
	next();
})

//配置静态资源
app.use(express.static('public'));

//OPTIONS请求处理
app.use((req,res,next)=>{
    if(req.method == 'OPTIONS'){
        res.send('OPTIONS OK');
    }else{
        next();
    }
})
//添加处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//处理路由
app.use('/',require('./routers/index.js'));


app.listen(3068,()=>{
	console.log('server is running at 127.0.0.1:3068')
});
