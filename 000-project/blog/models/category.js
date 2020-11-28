/*
* @Author: Administrator
* @Date:   2020-07-14 16:18:05
* @Last Modified by:   haom
* @Last Modified time: 2020-07-15 16:21:26
*/
const mongoose = require('mongoose');

//1.生成文档模型
//在存储和更新数据时,如果数据的类型和定义字段的类型不一致
//,mongoose内部会尝试将数据转换为定义的字段类型,如果转换失败则操作失败
const categorySchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'分类名不能为空']//哪里显示的:插入数据库失败err.message
	},
	order:{
		type:Number,
		default:0//null也会改变这个默认值，比如排序不输入值得时候，就是null
	}
});
//2.根据文档模型生成集合
const categoryModel = mongoose.model('category',categorySchema);//categorys集合名

module.exports = categoryModel;