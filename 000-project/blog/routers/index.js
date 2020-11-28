/*
* @Author: Administrator
* @Date:   2020-07-14 10:04:24
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-14 10:31:22
*/
const express = require('express')
const route = express.Router();

const categoryModel = require('../models/category.js')
const articleModel = require('../models/article.js')
const commentModel = require('../models/comment.js')

//抽取首页共通数据
async function getCommonData(){
	//获取首页顶部分类数据
	const categoriesPromise = categoryModel.find({},'name').sort({order:-1});
	//获取首页点击排行数据
	const topArticlesPromise = articleModel.find({},'_id click title').sort({click:-1}).limit(10);//显示10条点击排行

	const categories = await categoriesPromise;
	const topArticles = await topArticlesPromise;

	return {
		categories,
		topArticles
	}
}
//显示首页
route.get('/', (req,res) =>{
	/*
	将这一块抽取到app.js中，就可以实现所有的路由都能调用
	//获取cookie信息
	let userInfo = {};
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'));//转换成对象
	}
	*/
	getCommonData()//第一层
	.then(commonData=>{
		// const categories = commonData.categories;
		const {categories,topArticles} = commonData;
		//获取首页文章列表
		articleModel.getPaginationData(req)//第二层
		.then(indexArticle=>{
			const { list,page,pages,docs } = indexArticle;
			// console.log(indexArticle);
			res.render('main/index',{
				//全局
				userInfo:req.userInfo,
				//上一层
				categories,
				topArticles,
				//内层数据
				list,
				page,
				pages,
				docs
			})
		})
	})
});
//处理首页分页ajax请求
route.get('/articles',(req,res)=>{
	const { id } = req.query;
	const query = {};
	if(id){
		query.category = id;//经典啊
	}
	articleModel.getPaginationData(req,query)
	.then(data=>{
		res.send({
			code:0,
			message:'获取首页分页数据成功',
			data:data
		})
	})
	.catch(err=>{
		console.log(err)
	})
})

//显示列表页.
route.get('/list/:id', (req,res) =>{
	const { id } = req.params;
	let query = {};
	if(id){
		query.category = id;//查询条件：db.articles.find({category:ObjectId("5f19805a00b355291c81ccc6")})
	}
	// console.log(id);
	//拿到参数就可以通过此id查询数据库然后返回前台数据
	getCommonData()
	.then(commonData=>{
		const {categories,topArticles} = commonData;
		articleModel.getPaginationData(req,query)
		.then(data=>{
			// console.log(data);
			const { docs,page,list,pages } = data;
			res.render('main/list',{
				userInfo:req.userInfo,
				//页面共通数据
				categories,
				topArticles,
				//list页面数据
				docs,
				page,
				list,
				pages,
				//回传分类id
				category:id
			})
		})
		.catch(err=>{
			res.send({
				code:10,
				message:err
			})
		})

	})
	.catch(err=>{
		res.send({
			code:10,
			message:err
		})
	})
	
});

//获取详情页数据
async function getDetailData(req){
	const id = req.params.id;
	//获取共通数据(顶部，点击排行)
	const getCommomDataPromise = getCommonData();
	//获取文章详情(并且改变点击数)
	const getArticleDetailPromise = articleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
	.populate({ path: 'author', select: 'name' })
	.populate({ path: 'category', select: 'name' })	;

	//获取评论分页数据
	const getCommentsDataPromise = commentModel.getPaginationData(req,{articleId:id})

	//为了保证详情文章中点击数和点击排行中点击数数据保持一致
	//必须先获取文章更新后的数据再获取点击排行数据
	const articleData = await getArticleDetailPromise;
	const commonData = await getCommomDataPromise;
	//获取评论
	const commentsData = await getCommentsDataPromise;

	//返回数据
	const { categories,topArticles } = commonData;
 	return {
		categories,
		topArticles,

		articleData,

		commentsData
	}
}
//显示详情页
route.get('/detail/:id', (req,res) =>{
	// const id = req.params.id;//转移到调用那里
	getDetailData(req)
	.then(result=>{
		// console.log(result);
		const { categories,topArticles,articleData,commentsData } = result;
		// console.log(articleData.category._id);
		// console.log(commentsData);
		res.render('main/detail',{
			userInfo:req.userInfo,
			//页面共通数据
			categories,
			topArticles,
			//详情页数据
			articleData,
			//详情页改变顶部选中状态
			category:articleData.category._id,
			//详情页评论数据
			comments:commentsData.docs,
			page:commentsData.page,
			pages:commentsData.pages,
			list:commentsData.list
		})	
	})
	.catch(err=>{
		console.log(err)
	})
});
//显示评论列表



module.exports = route