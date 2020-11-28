/*
* @Author: Administrator
* @Date:   2020-07-10 13:25:57
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-10 17:36:32
*/
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://127.0.0.1:27017/users',{ useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	if(err) throw err;
});
db.on('open',(err,doc)=>{
	console.log('connect successfully');//连接成功，开始操作数据

	//1.生成文档模型
	const userSchema = new mongoose.Schema({
		name:String,
		age:Number
	});
	//2.根据文档模型生成集合
	const users = mongoose.model('user',userSchema);
	//第一个参数是集合的名称(mongoose会自动将集合名词变成复数),
	//第2个参数就是传入的文档模型
	
	//3.根据生成的集合进行数据库操作：CRUD
	//3.4 删除
	/*
	//常用删除方法1
	users.deleteOne({name:'tom'},(err,doc)=>{
		if(err) throw err;
		console.log('insert:::',doc);		
	})
	*/
	//常用删除方法2
	users.deleteMany({name:'tom'},(err,doc)=>{
		if(err) throw err;
		console.log('insert:::',doc);		
	})	
})