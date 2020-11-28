/*
* @Author: Administrator
* @Date:   2020-07-11 11:53:30
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-11 15:54:02
*/
const mongoose = require('mongoose');

const verifyModel = require('../model/verify.js');

mongoose.connect('mongodb://127.0.0.1:27017/users',{ useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	if(err) throw err;
});
db.on('open',(err,doc)=>{
	if(err) throw err;
	console.log('successfully');
	
	verifyModel.insertMany([{name:'Mary',age:18,phone:15038789052}])
	.then(doc=>{
		console.log(doc)
	})
	.catch(err=>{
		console.log(err)
	})


})