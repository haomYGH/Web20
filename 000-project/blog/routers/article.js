const express = require('express')
const router = express.Router();

const hmac = require('../util/hmac.js');

const userModel = require('../models/user.js');
const pagination = require('../util/pagination.js');
const articleModel = require('../models/article.js');
const categoryModel = require('../models/category.js');

const multer = require('multer');
const upload = multer({dest:'public/uploads/'});
//专门用来处理multipar/form-data类型的表单数据
//dest:指定上传存储地址

//先验证是不是管理员.(不是管理员不能通过任何方式进入管理员页面http://127.0.0.1:3000/admin)
router.use('/',(req,res,next)=>{
	if(req.userInfo.isAdmin){
      next();//如果是管理员才能继续向下执行
    }else{
        res.send('<h1>非管理员禁止访问</h1>')
    }
})

//显示文章列表(分页显示)
router.get('/',(req,res)=>{
	/*
	const options = {
		page:req.query.page,
		model:articleModel,
		query:{},
		projection:'-__v',
		sort:{createdAt:1},
		populates:[{path: 'author', select: 'name'},{path: 'category', select: 'name'}]
		//用自身集合的author字段的值，找ref关联集合中对应_id的name字段的值
	}
	pagination(options)
	.then(data=>{
		// console.log(data.docs);
		res.render('admin/article_list',{
			//用户信息，顶部
			userInfo:req.userInfo,
			//content内容
			articles:data.docs,
			//分页
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})		
	})	
	*/
	articleModel.getPaginationData(req)
	.then(data=>{
		// console.log(data.docs);
		res.render('admin/article_list',{
			//用户信息，顶部
			userInfo:req.userInfo,
			//content内容
			articles:data.docs,
			//分页
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})		
	})	
})


//显示新增文章页面
router.get('/add',(req,res)=>{
	categoryModel.find({})
	.then(categories=>{
		res.render('admin/article_add_edit',{
			userInfo:req.userInfo,
			categories
		})
	})
	.catch(err=>{
		throw err
	})
})
//处理新增文章
router.post('/add',(req,res)=>{
	//获取参数
	const {category,title,intro,content} = req.body;
	//将文章插入数据库
	articleModel.insertMany({
		category:category,
		title:title,
		intro:intro,
		content:content,
		author:req.userInfo._id
	})
	.then(article=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'新增文章成功',
			url:'/article'
		})	
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:err
		})	
	})
})
//处理上传图片资源(single单个文件上传,array多个文件上传。括号里面的字段是请求里面的upload: (binary))
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	//然后把图片在后台静态资源地址返回给前台'/'代表静态资源
	const uploadedFilePath = '/uploads/'+req.file.filename;//静态资源请求
	res.json({
		uploaded:true,
		url:uploadedFilePath
	})
})

//显示编辑页面,注意/edit/参数  参数前要加:   为什么?
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;//params是req上的一个参数对象,获取get请求的参数
	//获取所有分类
	categoryModel.find({})
	.then(categories=>{
		//获取文字详情
		articleModel.findById(id)
		.then(article=>{
			res.render('admin/article_add_edit',{
				userInfo:req.userInfo,
				categories,
				article
			})	
		})
	})
	.catch(err=>{
		console.log(err)
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'数据库操作失败，请稍后再试'
		})	
	})
})
//处理编辑,通过hidden标签传递文章_id
router.post('/edit',(req,res)=>{
	//获取表单数据 post方式
	let { id,category,title,intro,content } = req.body;
	articleModel.updateOne({_id:id},{category,title,intro,content})//mongoose里面可以默认更新操作符为$set
	.then(article=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"修改文章成功",
			url:'/article'
		})	
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"修改文章失败,操作数据库错误,稍后再试一试"
		})		
	})
})

//删除分类
router.get('/delete/:id',(req,res)=>{
	//获取要删除的分类id
	const id = req.params.id;
	articleModel.deleteOne({_id:id})
	.then(success=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除分类成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"删除分类失败,操作数据库错误,稍后再试一试"
		})	
	})
})
//显示文章详情

module.exports = router