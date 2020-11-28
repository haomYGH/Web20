const mongoose = require('mongoose');//所有的操作都是在mongoose上进行的
const pagination = require('../util/pagination.js');
//引入moment处理时间(后台安装)
const moment = require('moment')

//1.定义Schema
const articleSchema = new mongoose.Schema({
	title:{
		type:String
	},
	intro:{
		type:String
	},
	content:{
		type:String
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'//ref没什么用，只是语义化：意思是跟users集合有关联
	},
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'category'
	},
	click:{
		type:Number,
		default:1
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});
//定义创建一个虚拟类型 (virtual type):
articleSchema.virtual('createdTime').get(function(){
	// return this.createdAt.toLocaleString();//toLocalString方法对时间格式化
	//在此基础上可以使用moment来进行格式化
	return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss');
})

//定义静态方法
articleSchema.statics.getPaginationData = function(req,query={}){
	const options = {
		page:req.query.page,//通过req获取
		model:this,//谁调用就是谁articleModel调用就是articleModel
		query:query,//默认查询所有{}
		projection:'-__v',//映射，不映射某个字段
		sort:{createdAt:1},//排序：创建时间，正序
		populates:[{path: 'author', select: 'name'},{path: 'category', select: 'name'}]//关联查询
	}
	return pagination(options)
}

//2.生成模型Model
const articleModel = mongoose.model('article', articleSchema);
//3.导出模型Model
module.exports = articleModel;