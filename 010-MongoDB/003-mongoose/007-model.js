/*
* @Author: Administrator
* @Date:   2020-07-11 10:02:55
* @Last Modified by:   haom
* @Last Modified time: 2020-07-13 07:05:47
*/
const mongoose = require('mongoose');
const moment = require('moment');

const verifyModel = require('./model/verify.js');

mongoose.connect('mongodb://127.0.0.1:27017/verify',{ useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	if(err) throw err;
});
db.on('open',(err,doc)=>{
	if(err) throw err;
	/*
	verifyModel.insertMany([{name:'Jeck',age:888}])
	.then(doc=>{
		console.log(doc.createdAt.toLocaleString())
	})
	.catch(err=>{
		console.log(err)
	})
	*/
	verifyModel.findOne({name:'Jeck',age:888})
	// .then(doc=>console.log(doc.createdAt.toLocaleString()))
	.then(
		doc=>console.log(moment(doc.createdAt).format('YYYY h:mm:ss a'))
	)
	.catch(err=>console.log(err))
})