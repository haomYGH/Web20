const express = require('express')
const router = express.Router();
const userModel = require('../models/user.js');
const categoryModel = require('../models/category.js');
const hmac = require('../util/hmac.js');
const pagination = require('../util/pagination.js');

//管理员权限处理.(不是管理员不能通过任何方式进入管理员页面http://127.0.0.1:3000/admin)
router.use('/',(req,res,next)=>{
	if(req.userInfo.isAdmin){
      next();//如果是管理员才能继续向下执行
    }else{
        res.send('<h1>非管理员禁止访问</h1>')
    }
})

//显示分类管理(分页显示)
router.get('/',(req,res)=>{
	const options = {
		page:req.query.page,
		model:categoryModel,
		query:{},
		projection:'-__v',
		sort:{order:-1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:data.docs,
			
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/category'
		})		
	})	
})


//新增页面
router.get('/add',(req,res)=>{
	res.render('admin/category_add_edit',{
		userInfo:req.userInfo
	})
})
//新增提交页面
router.post('/add',(req,res)=>{
	//获取参数
	let {name,order} = req.body;
	if(!order){
		order = 0;
	}
	//验证数据库是否有同名
	categoryModel.findOne({name})
	.then(category=>{
		if(category){//有，不能新增
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"添加分类失败,分类已存在"
			})
		}else{//没有同名，则插入数据库
			categoryModel.insertMany({
				name,
				order
			})
			.then(success=>{
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:'添加分类成功',
					url:'/category'
				})
			})
			.catch(err=>{
				res.send(err.message)//打印出Schema的错误提示
			})
		}
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"添加分类失败,操作数据库错误,稍后再试一试"
		})
	})
})

//显示编辑页面,注意/edit/参数  参数前要加:   为什么?
router.get('/edit/:id',(req,res)=>{
	let { id } = req.params;//params是req上的一个参数对象
	categoryModel.findById(id)
	.then(category=>{
		res.render('admin/category_add_edit',{
			userInfo:req.userInfo,
			category
		})		
	})
})
//处理编辑
router.post('/edit',(req,res)=>{
	//获取post参数
	let { id,name,order } = req.body

	categoryModel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){//没有更改
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"请修改后再提交"
			})			
		}else{
			categoryModel.findOne({name:name,_id:{$ne:id}})//不允许重名分类名,为什么要加_id,为了逻辑严谨,不查此id
			.then(newCategory=>{
				if(newCategory){
					res.render('admin/error',{
						userInfo:req.userInfo,
						message:"修改分类失败,分类已存在"
					})	
				}else{
					categoryModel.updateOne({_id:id},{name,order})
					.then(result=>{
						res.render('admin/success',{
							userInfo:req.userInfo,
							message:'修改分类成功',
							url:'/category'
						})					
					})
					.catch(err=>{
						throw err;
					})					
				}
			})
			.catch(err=>{
				throw err;
			})
		}
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"修改分类失败,操作数据库错误,稍后再试一试"
		})		
	})
})

//删除分类
router.get('/delete/:id',(req,res)=>{
	//获取要删除的分类id
	const id = req.params.id;
	categoryModel.deleteOne({_id:id})
	.then(success=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除分类成功',
			url:'/category'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"删除分类失败,操作数据库错误,稍后再试一试"
		})	
	})
})

module.exports = router