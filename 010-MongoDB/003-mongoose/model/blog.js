/*
* @Author: Administrator
* @Date:   2020-07-11 15:56:34
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-11 16:26:09
*/
const mongoose = require('mongoose');

//1.生成文档模型
const blogSchema = new mongoose.Schema({
	name:{
		type:String,
	},
	age:{
		type:Number
	},
	author:{
		type:mongoose.Schema.Types.ObjectId
	},
	phone:{
		type:Number,
		//自定义验证
        validate:{
            validator:function(val){
                return /1[358]\d{9}/.test(val)
            },
            message:'{VALUE} 不是合法电话号码'
        }		
	}
});
//2.根据文档模型生成集合
const blogModel = mongoose.model('blog',blogSchema);//verifies

module.exports = blogModel;