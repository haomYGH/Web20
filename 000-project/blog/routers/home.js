const express = require('express')
const router = express.Router();

const userModel = require('../models/user.js');
const commentModel = require('../models/comment.js');
const hmac = require('../util/hmac.js');
const pagination = require('../util/pagination.js');

//用户权限验证
router.use('/',(req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.send('<h1>请先登录!</h1>')
	}
})


//显示后台个人首页
router.get('/',(req,res)=>{
	res.render('home/index',{
		userInfo:req.userInfo
	})
})

//显示评论列表页面
router.get('/comment',(req,res)=>{
	//获取所有评论分页信息
	commentModel.getPaginationData(req,{user:req.userInfo._id.toString()})
	.then(result=>{
        // console.log(result);
		res.render('home/comment_list',{
			userInfo:req.userInfo,
			comments:result.docs,
			page:result.page,
			list:result.list,
			pages:result.pages
		})
	})
	.catch(err=>{
		console.log(err)
	})
})
//处理删除评论逻辑
router.get('/comment/delete/:id',(req,res)=>{
	//获取参数
	const id = req.params.id;
	//通过ID查找数据库并删除该条记录
	commentModel.deleteOne({_id:id})
	.then(data=>{
		res.render('home/success',{
			userInfo:req.userInfo,
			message:'删除评论成功',
			url:'/home/comment'
		})
	})
	.catch(err=>{
		console.log(err);
		res.render('home/err',{
			userInfo:req.userInfo,
			message:'操作数据库失败,请稍后再试!',
			url:'/home/comment'
		})
	})
})

//显示修改密码页面
router.get('/pwd',(req,res)=>{
	res.render('home/pwd',{
		userInfo:req.userInfo,
	})
})
//处理更新密码路由
router.post('/password',(req,res)=>{
	const { password } = req.body;
	//查询数据库更新密码
	userModel.updateOne({_id:req.userInfo._id},{pwd:hmac(password)})
	.then(data=>{
		//清除用户状态信息
		req.session.destroy()
		res.render('home/success',{
			userInfo:req.userInfo,
			message:'更新密码成功',
			url:'/'
		})
	})
	.catch(err=>{
		console.log(err);
		res.render('home/err',{
			userInfo:req.userInfo,
			message:'操作数据库失败,请稍后再试!',
			url:'/home'
		})
	})
})




module.exports = router