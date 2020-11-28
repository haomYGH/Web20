/*
* @Author: Administrator
* @Date:   2020-07-14 16:11:24
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-16 09:53:04
*/
const express = require('express')
const router = express.Router();
//引入数据库操作模型
const userModel = require('../models/user.js');
const categoryModel = require('../models/category.js');
const commentModel = require('../models/comment.js');
// 引入工具
const hmac = require('../util/hmac.js');
const pagination = require('../util/pagination.js');
const route = require('./index.js');

//管理员权限处理.(不是管理员不能通过任何方式进入管理员页面http://127.0.0.1:3000/admin)
router.use('/',(req,res,next)=>{
	if(req.userInfo.isAdmin){
      next();//如果是管理员才能继续向下执行
    }else{
        res.send('<h1>非管理员禁止访问</h1>')
    }
})

//显示管理中心
router.get('/', (req,res) =>{
	res.render('admin/index',{
		userInfo:req.userInfo
	})
});

//显示用户管理列表
router.get('/users',(req,res)=>{
	/*
	// 获取参数信息
	let page = req.query.page / 1;//容错处理，隐式转换
	*/
	// console.log(req.query.page);//这个page是怎么传入的,第一次:第一次没传(undefined)，通过isNaN判断赋值page=1
	const options = {
		page:req.query.page,
		model:userModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/admin/users'
		})		
	})
});
//显示评论管理列表
router.get('/comment', (req,res) =>{
	commentModel.getPaginationData(req)
	.then(result=>{
		const { page,pages,list } = result;
		// console.log(result.docs);
		// console.log(page,pages,list);
		res.render('admin/comment_list',{
			userInfo:req.userInfo,
			//评论数据
			comments:result.docs,
			//分页数据
			page,pages,list
		})
	})
});
//处理评论删除操作
router.get('/comment/delete/:id',(req,res)=>{
	const id = req.params.id;
	commentModel.deleteOne({_id:id})
	.then(data=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除评论成功',
			url:'/admin/comment'
		})
	})
})
//显示修改密码页面
router.get('/pwd',(req,res)=>{
	res.render('admin/pwd',{
		userInfo:req.userInfo,
	})
})
//处理修改密码
router.post('/password',(req,res)=>{
	const password = req.body.password;
	console.log(password);
	//操作user数据库修改密码
	userModel.updateOne({_id:req.userInfo.id},{pwd:hmac(password)})
	.then(data=>{
		//清除用户状态信息=>重新登录
		req.session.destroy()
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'更新密码成功',
			url:'/'
		})
	})
})


module.exports = router