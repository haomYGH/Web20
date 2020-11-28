/*
* @Author: Administrator
* @Date:   2020-07-10 17:50:38
* @Last Modified by:   haom
* @Last Modified time: 2020-07-10 21:45:56
*/
/*
	> show dbs
	admin   0.000GB
	config  0.000GB
	local   0.000GB
	users   0.000GB
	> use users
	switched to db users
	> show tables
	users
*/
//使用mongoose连接数据库，操作数据库
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/users',{ useNewUrlParser: true,useUnifiedTopology: true });//服务器端口号/数据库名

const db = mongoose.connection;

db.on('error',(err)=>{
	if(err) throw err;
});
db.on('open',(err,doc)=>{
	if(err) throw err;
	//连接成功后，开始操作数据库
	//1.生成文档模型
	const userSchema = new mongoose.Schema({
		name:String,
		age:Number
	});
	//2.根据文档模型生成集合
	const users = mongoose.model('user',userSchema);//操作users集合,(mongoose会自动将集合名词变成复数)	

	//去重
	users.distinct('age',(err,doc)=>{
		if(err) throw err;
		console.log(doc);
	})
})