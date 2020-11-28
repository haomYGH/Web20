/*
* @Author: Administrator
* @Date:   2020-07-11 11:55:47
* @Last Modified by:   haom
* @Last Modified time: 2020-07-13 07:16:33
*/
const mongoose = require('mongoose');

//1.生成文档模型
//在存储和更新数据时,如果数据的类型和定义字段的类型不一致
//,mongoose内部会尝试将数据转换为定义的字段类型,如果转换失败则操作失败
const verifySchema = new mongoose.Schema({
	name:String,
	age:{
		type:Number,
		//内置验证
		//3次验证：前台(页面)发送请求做一次验证，后台(NodeJs)接受请求做第2次验证，后台将数据存在数据库，数据库存储之前还要做一次验证
		//内置验证或者自定义验证，属于第2次验证
		min:[18,'太小了，不符合'],
		max:[45,'太大了，不符合']
	},
	createdAt:{
		type:Date,
		default:Date.now
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
const verifyModel = mongoose.model('verify',verifySchema);//verifies

module.exports = verifyModel;