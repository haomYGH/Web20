/*
分页抽取前
*/
const express = require('express')
const router = express.Router();
const userModel = require('../models/user.js');
const categoryModel = require('../models/category.js');
const hmac = require('../util/hmac.js');

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

//显示用户列表
router.get('/users',(req,res)=>{
	// 获取参数信息
	let page = req.query.page / 1;//容错处理，隐式转换
	if(isNaN(page)){
		page = 1;
	}
	//上一页边界控制
	if(page <= 0){
		page=1
	}
	//分页显示,后台抽取对应数据
	let limitPage = 5;//抽取5条显示
	// let skipPage = (page-1)*limitPage;//第几页跳过多少条数据
	
	//获取数据库中有多少条数据，(用来计算总共显示几页)
	userModel.countDocuments({},function(err,count){
		//数据总共可以分为多少页
		let pages = Math.ceil(count/limitPage);
		//用i 表示第一页,for循环数组表示多少个<li>
		let list = [];//[1,2,3]
		for(let i=1;i<=pages;i++){
			list.push(i)
		}
		//下一页边界控制
		if(page > pages){//pages=6，当page=6时，正常显示 不需要进入这里>=
			page = pages;
		}
		//下一页边界控制之后再计算第几页显示多少数据
		let skipPage = (page-1)*limitPage;//第几页跳过多少条数据
		//查询数据库获取用户信息
		userModel.find({},'-password -__v')
		.skip(skipPage).limit(limitPage)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users:users,
				page:page,
				list:list,
				pages:pages
			})
		})
		.catch(err=>{
			console.log(err)
		})
	})
});

module.exports = router