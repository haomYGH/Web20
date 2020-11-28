/*
* @Author: Administrator
* @Date:   2020-07-10 10:50:21
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-10 12:50:18
*/
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
	/*
	if(err){
		console.log('err is::',err);
		//抛出异常
		throw err;
	}
	*/
	//简写
	if(err) throw err;
	console.log('connect successfully !')
  // if(err){
  // 	console.log('err::',err);
  // 	console.log(('connect err'))
  // }else{
  // 	 console.log('connect successfully')
  // }
 
  // perform actions on the collection object
  client.close();
});