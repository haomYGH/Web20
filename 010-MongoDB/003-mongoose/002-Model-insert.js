/*
* @Author: Administrator
* @Date:   2020-07-10 13:25:57
* @Last Modified by:   haom
* @Last Modified time: 2020-07-10 22:39:19
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
	/*
	//3.1 新增方法1,实例方法
	const user = new users({name:'tom',age:18});
	user.save()
	.then((doc)=>{
		console.log(doc);
	})
	.catch((err)=>{
		console.log(err)
	})
	*/
	//推荐方法2
	//3.1 新增方法2，静态方法
	users.insertMany([{name:'Alice',age:18},{name:'Jeck',age:23}])
	.then(doc=>console.log(doc))
	.catch(err=>console.log(err));
	/*	
	//3.2 新增方法3，静态方法(一条一条插入,没有insertMany插入快)
	users.create([{name:'let',age:28},{name:'Alice',age:25}])
	.then(doc=>console.log(doc))
	.catch(err=>console.log(err));
	*/
	/*
	//3.2 查找
	users.findOne({name:'tom'},(err,doc)=>{
		if(err) throw err;
		console.log('insert:::',doc);		
	})
	*/
	/*
	//3.3 更新
	//注意：mongoose中更新操作符默认就是$set
	users.update({name:'tom'},{age:66},(err,doc)=>{
		if(err) throw err;
		console.log('insert:::',doc);
	})
	*/
	/*
	//3.4 删除
	users.deleteOne({name:'tom'},(err,doc)=>{
		if(err) throw err;
		console.log('insert:::',doc);		
	})
	*/
})

