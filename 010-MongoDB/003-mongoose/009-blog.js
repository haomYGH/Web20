/*
* @Author: Administrator
* @Date:   2020-07-11 15:59:51
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-11 16:09:16
*/
const mongoose = require('mongoose');

const blogModel = require('./model/blog.js');

mongoose.connect('mongodb://127.0.0.1:27017/users',{ useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	if(err) throw err;
});
db.on('open',(err,doc)=>{
	if(err) throw err;
	
	blogModel.insertMany({name:'Jeck',phone:15037877650,author:'5f097312013f812634cf5959'})
	.then(doc=>{
		console.log(doc)
	})
	.catch(err=>{
		console.log(err)
	})
})