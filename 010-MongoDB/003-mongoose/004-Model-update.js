/*
* @Author: Administrator
* @Date:   2020-07-10 13:25:57
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-10 17:35:04
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
	//3.3 更新
	//注意：mongoose中更新操作符默认就是$set
	/*
	//常用更新方法1
	users.updateMany({name:'tom'},{age:18},(err,doc)=>{//找到所有name=tom文档，找到后更新age=18,没有则添加
		if(err) throw err;
		console.log('insert:::',doc);
	})
	*/
	//常用更新方法2
	users.updateOne({name:'tom'},{age:88},(err,doc)=>{//找到第一个name=tom文档，找到后更新age=18,没有则添加
		if(err) throw err;
		console.log('insert:::',doc);
	})	
	/*
	//3.4 删除
	users.deleteOne({name:'tom'},(err,doc)=>{
		if(err) throw err;
		console.log('insert:::',doc);		
	})
	*/
})