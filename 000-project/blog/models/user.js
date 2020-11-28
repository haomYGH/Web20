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
const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'用户名不能为空'],
		minlength:[3,'用户名最少3个字符'],//属性小写
		maxlength:[10,'用户名最多10个字符']
	},
	pwd:{
		type:String,
		required:[true,'密码不能为空']//密码由加密插件处理后，长度不可控制
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
});
//2.根据文档模型生成集合
const userModel = mongoose.model('user',userSchema);//users集合名

module.exports = userModel;