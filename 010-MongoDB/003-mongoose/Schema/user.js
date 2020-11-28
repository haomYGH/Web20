/*
* @Author: haom
* @Date:   2020-07-15 16:15:29
* @Last Modified by:   haom
* @Last Modified time: 2020-07-15 16:15:33
*/
const mongoose = require('mongoose');

//1.生成文档模型
const UserSchema = new mongoose.Schema({
  	name:{
  		type:String,
  		required:[true,'用户名不能为空'],
  		minlength:[2,'用户名长度不少于2个字符'],
  		maxlength:[8,'用户名长度不超过8个字符']
  	},
  	age:{
  		type:Number,
  		required:[true,'年龄不能为空'],
  		min:[20,'年龄不能小于20'],
  		max:[100,'年龄不能大于100']
  	},
  	major:{
  		type:String,
  		required:[true],
  		enum:['Sport','Music','Art']
  	},
  	isAdmin:{
  		type:Boolean
  	},
  	phone:{
  		type:Number,
  		validate:{
  			validator:(val)=>{
  				return /1[35789]\d{9}/.test(val)
  			},
  			message:'电话号码不合法'
  		}
  	},
  	createdAt:{
  		type:Date,
  		default:Date.now
  	},
  	friends:{
  		type:Array
  	}
});



	//自定义实例方法
	UserSchema.methods.getBlogs = function(cb){
		// console.log('xxx');
		// console.log(this);
		// console.log(this.model('blog'))
		this.model('blog').find({author:this._id},cb)
	}
	//自定义静态方法
	UserSchema.statics.findByPhone = function(val,cb){
		// console.log('aaa');
		// console.log(this);
		// console.log(this.model('user') === this)
		this.findOne({phone:val},cb)
	}




//2.根据文档模型生成集合
//2.1第一个参数代表着生成集合的名称(mongoose会自动将集合名称变成负数)
//2.2第二个参数就是传入定义的文档模型UserSchema
const UserModel = mongoose.model('user',UserSchema);


module.exports = UserModel;