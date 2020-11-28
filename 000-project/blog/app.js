/*
* @Author: Administrator
* @Date:   2020-07-14 09:34:21
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-14 16:37:04
*/
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const swig = require('swig');
const bodyParser = require('body-parser');

const Cookies = require('cookies');

const session = require('express-session');

const MongoStore = require("connect-mongo")(session);


//通过中间件来传递post请求类型的参数。后面可以通过req.body来获取参数
app.use(bodyParser.json());
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));//如果用虚拟路径的话，引用的css等文件前面都得加 /static

//使用mongoose连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/users',{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('error',(err)=>{
	if(err) throw err;
});
db.on('open',(err,doc)=>{
	if(err) throw err;

	console.log('connect successfully');//数据库连接成功
});

//swig模板引擎
//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
});
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

/*
//cookies  保存状态信息
app.use('/',(req,res,next)=>{
	//生成cookie实例并保存在req对象上
	req.cookies = new Cookies(req,res);
	let userInfo = {};
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'));//转换成对象
	}
	//把cookie状态信息保存在req.userInfo上，那么后面所有的路由都可以通过这个拿到状态信息
	req.userInfo = userInfo;
	
	next();
});
*/
//express-session  保存状态信息
app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
	cookie:{maxAge:1000*60*60*24},
	//设置session存储在数据库中。(作用：重启服务器不清空cookie)
	store:new MongoStore({ mongooseConnection: mongoose.connection })   	
}))
//也通过中间件来传递
app.use('/',(req,res,next)=>{
	req.userInfo = req.session.userInfo || {};
	
	next();
});

// 处理路由--------------------------------------
app.use('/',require('./routers/index.js'));
app.use('/user',require('./routers/user.js'));
app.use('/admin',require('./routers/admin.js'));
app.use('/home',require('./routers/home.js'));
app.use('/category',require('./routers/category.js'));
app.use('/article',require('./routers/article.js'));
app.use('/comment',require('./routers/comment.js'));



app.listen(port, () => console.log(`Example app listening on http://127.0.0.1:3000`))