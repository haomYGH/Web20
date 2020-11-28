const mongoose = require('mongoose');
const moment = require('moment');
const pagination = require('../util/pagination.js')

//1.生成文档模型
const commentSchema = new mongoose.Schema({
  	content:{
  		type:String,
  	},
    user:{
    	type:mongoose.Schema.Types.ObjectId,
    	ref:'user'
    },
    articleId:{
    	type:mongoose.Schema.Types.ObjectId,
    	ref:'article'
    },
    createdAt:{
    	type:Date,
    	default:Date.now
    }
});
    //定义时间虚拟属性
    commentSchema.virtual('createdTime').get(function () {
        // return this.createdAt.toLocaleString();
        return moment(this.createdAt).format('YYYY - MM - DD HH:mm:ss')
    });
    //定义获取评论分页数据静态方法
    commentSchema.statics.getPaginationData = function(req,query={}){
        const options = {
            page:req.query.page / 1,
            model:this,
            query:query,
            projection:'-__v',
            sort:{_id:1},
            populates:[{ path: 'user', select: 'name' },{ path:'articleId',select:'title' }]
            //文章标题，需要在后台评论管理列表里使用
        }
        return pagination(options)
    }

//2.根据文档模型生成集合
//2.1第一个参数代表着生成集合的名称(mongoose会自动将集合名称变成复数)
//2.2第二个参数就是传入定义的文档模型commentSchema
const commentModel = mongoose.model('comment',commentSchema);


module.exports = commentModel;