/*
* @Author: Administrator
* @Date:   2020-07-11 15:59:40
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-11 16:04:00
*/
const mongoose = require('mongoose');

const userModel = require('./model/user.js');

mongoose.connect('mongodb://127.0.0.1:27017/users',{ useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	if(err) throw err;
});
db.on('open',(err,doc)=>{
	if(err) throw err;
	
	userModel.insertMany([{name:'Jeck',age:28}])
	.then(doc=>{
		console.log(doc)
	})
	.catch(err=>{
		console.log(err)
	})
})