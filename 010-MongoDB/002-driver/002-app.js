/*
* @Author: Administrator
* @Date:   2020-07-10 10:50:21
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-10 13:13:45
*/
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  if(err){
  	console.log('err::',err);
  	console.log(('connect err'))
  	throw err;
  }
	//创建库
	const db = client.db("users");//操作哪个库，没有则新建
	//创建集合
	const collection = db.collection("teacher");//操作哪个集合，没有则新建

	//操作集合
	/*
	//1.插入数据
	collection.insert({name:'tom',age:35},(err,doc)=>{
		if(err) throw err;

		console.log(doc);
		//无论操作成功还是失败，都得断开数据库
		client.close();
	});
	*/
	/*
	//2.查询数据,查询到的数据转成数组打印出来
	collection.find({}).toArray((err,doc)=>{
		if(err) throw err;

		console.log(doc);
		client.close();
	})
	*/
	/*
	//3.修改数据
	//更新操作符 $set 匹配到则修改，没有则添加。不适用更新操作符则替换所有字段
	//找出集合中所有name='tom'字段的数据,更新age:20
	collection.updateMany({name:'tom'},{$set:{age:20}},(err,doc)=>{
		if(err) throw err;

		console.log(doc);
		client.close();
	});
	*/
	//4.删除集合中的数据
	collection.deleteOne({name:'tom'},(err,doc)=>{
		if(err) throw err;

		console.log(doc);
		client.close();		
	})
	/*
> db.teacher.find()
> db
users	
	 */
});