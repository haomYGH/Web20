/*
* @Author: Administrator
* @Date:   2020-07-14 16:11:24
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-16 09:53:04
*/
const express = require('express')
const route = express.Router();
const userModel = require('../models/user.js');
const hmac = require('../util/hmac.js');

//用户注册
route.post('/register', (req,res) =>{
	//获取参数
	// console.log(req.body)
	const { username,password } = req.body;
	//后台验证,通过userModel这个Schema
	//验证用户名是否同名
	userModel.findOne({name:username})
	.then(user=>{
		if(user){
			res.json({
				code:10,
				message:'用户名已存在,请重新输入'
			})
		}
		//没有则插入数据库
		else{
			userModel.insertMany({
				name:username,
				pwd:hmac(password),
				// isAdmin:true//管理员注册
			})
			.then(reg=>{
				res.json({
					code:0,
					message:'注册成功'
				})
			})
			.catch(err=>{
				res.json({
					code:10,
					message:'数据库操作失败，请稍后再试'
				})
			})
		}
	})
	.catch(err=>{
		res.json({
			code:10,
			message:'数据库操作失败，请稍后再试'
		})
	})
});
//用户登录
route.post('/login', (req,res) =>{
	//获取参数
	// console.log(req.body)
	const { username,password } = req.body;
	//后台验证,通过userModel这个Schema
	//验证用户名和密码是否正确
	userModel.findOne({name:username,pwd:hmac(password)},'-pwd')
	.then(user=>{
		if(user){//证明用户名密码正确
			//登陆成功设置cookies
			// req.cookies.set('userInfo',JSON.stringify(user),{maxAge:1000*60*60*24});//cookie名,值(字符串),过期时间(毫秒)
			req.session.userInfo = user;//cookie+session
			res.json({
				code:0,
				message:'登陆成功',
				user:user
			})
		}else{
			res.json({
				code:10,
				message:'用户名或密码有误，请重新输入...'
			})
		}
	})
	.catch(err=>{
		res.json({
			code:10,
			message:'数据库操作失败，请稍后再试'
		})		
	})
	
});
//用户推出
route.get('/logout',(req,res)=>{
	//cookie方式清除
	// req.cookies.set('userInfo',null);
	//session方式清除
	req.session.destroy();
	res.json({
		code:0,
		message:'退出成功'
	})
})

module.exports = route