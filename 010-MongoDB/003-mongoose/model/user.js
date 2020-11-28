/*
* @Author: Administrator
* @Date:   2020-07-11 10:02:38
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-11 15:57:58
*/
const mongoose = require('mongoose');

//1.生成文档模型
const userSchema = new mongoose.Schema({
	name:String,
	age:Number
});
//2.根据文档模型生成集合
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;
