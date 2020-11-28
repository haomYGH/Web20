const express = require('express')
const route = express.Router();

const commentModel = require('../models/comment.js');

//处理添加评论路由
route.post('/add',(req,res)=>{
    const { content,articleId } = req.body;
	//将评论插入到数据库中
	commentModel.insertMany({
		content,
        articleId,
        
		user:req.userInfo._id.toString()
	})
	.then(comment=>{
		//将最新的评论分页数据返回给前台
		commentModel.getPaginationData(req,{articleId:articleId})
		.then(comments=>{
			// console.log(comments);
			res.json({
				code:0,
				message:'获取评论成功',
				data:comments
			})
		})
		.catch(err=>{
			console.log(err)
			res.json({
				code:10,
				message:'获取评论失败...'
			})
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({
			code:10,
			message:'添加评论失败'
		})
	})
})
//评论列表分页数据
route.get('/list',(req,res)=>{
	//page:获取第几页，id:获取哪篇文章下的评论
	// const { page,id } = req.query;//page直接通过传入的req获取
	const id = req.query.id;
	let query = {};
	if(id){
		query.articleId = id;
	}
	//调用模板上的方法，获取对应文章的分页评论数据
	commentModel.getPaginationData(req,query)
	.then(data=>{
		res.send({
			code:0,
			data
		})
	})
})

module.exports = route