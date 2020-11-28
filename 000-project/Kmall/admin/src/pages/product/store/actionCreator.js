/*
* @Author: Chen
* @Date:   2020-07-28 10:35:29
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-08 11:36:26
*/
import axios from 'axios'
import * as types from './actionTypes.js'
import { message } from 'antd'
import apiObj from 'api'

//处理新增或者编辑商品
const setMainImageErrAction = ()=>({
	type:types.SET_MAIN_IMAGE_ERR,
})
const setImagesErrAction = ()=>({
	type:types.SET_IMAGES_ERR,
})
export const getSavePrductsAction = (err,values)=>{
	return (dispatch,getState)=>{
		const getValues = getState().get('product')
		const mainImage = getValues.get('mainImage');
		const images = getValues.get('images');
		const detail = getValues.get('detail');
		let hasErr = false;
		if(err){
			hasErr = true;
		}
		//自定义组件验证
		if(!mainImage){
			hasErr = true;
			dispatch(setMainImageErrAction())
		}
		if(!images){
			hasErr = true;
			dispatch(setImagesErrAction())
		}
		if(hasErr){
			return 
		}
		//验证通过,发送请求
		//判断是新增商品还是编辑商品:根据参数是否传递了ID
		// console.log(values)
		let request = apiObj.addProducts;
		if(values.id){
			request = apiObj.updateProducts
		}
		request({
			...values,
			mainImage,
			images,
			detail,
		})
		.then(result=>{
			const data = result.data;
			// console.log(data)
			if(data.code == 0){//登录成功
				message.success(data.message,()=>{
					window.location.href = '/product'
				})
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
	}
}
const setLevelCategories = (payload)=>({
	type:types.SET_LEVEL_CATEGORIES,
	payload
})
//处理获取最新商品分类
export const getLevelCategoriesAction = ()=>{
	return (dispatch,getState)=>{
		apiObj.getLevelCategories({
			level:3
		})
		.then(result=>{
			const data = result.data;
			// console.log(data)
			if(data.code == 0){//登录成功
				dispatch(setLevelCategories(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
	}
}
//处理商品列表分页数据
export const setPageAction = (val)=>({
	type:types.SET_PAGE,
	payload:val
})
export const getProductsStartAction = ()=>({
	type:types.REQUEST_START_ACTION
})
export const getProductsDoneAction = ()=>({
	type:types.REQUEST_DONE_ACTION
})
export const getPageAction = (page,keyword)=>{
	return (dispatch,getState)=>{
		//发送请求之前显示loading状态
		dispatch(getProductsStartAction())
		const options = {
			page:page
		}
		//判断是否有关键词检索
		if(keyword){
			options.keyword = keyword
		}
		apiObj.getProductsList(options)
		.then(result=>{
			const data = result.data;
			console.log(data)
			if(data.code == 0){//登录成功
				dispatch(setPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getProductsDoneAction())
		})
	}
}


//处理自定义组件存值到store
export const getMainImageAction = (mainImage)=>({
	type:types.SET_MAIN_IMAGE,
	payload:mainImage
})
export const getImagesAction = (images)=>({
	type:types.SET_IMAGES,
	payload:images
})
export const getDetailAction = (values)=>({
	type:types.SET_DETAIL,
	payload:values
})
//处理更新是否首页显示
export const getUpdateIsShowAction = (id,newIsShow)=>{
	return (dispatch,getState)=>{
		//发送请求之前显示loading状态
		const page = getState().get('product').get('current');
		dispatch(getProductsStartAction())
		apiObj.updateProductsIsShow({
			id:id,
			isShow:newIsShow,
			page:page
		})
		.then(result=>{
			const data = result.data;
			// console.log(data)
			if(data.code == 0){//登录成功
				message.success('更新显示隐藏成功')
				dispatch(setPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getProductsDoneAction())
		})
	}
}
//处理更新上架/下架
export const getUpdateStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		//发送请求之前显示loading状态
		const page = getState().get('product').get('current');
		dispatch(getProductsStartAction())
		apiObj.updateProductsStatus({
			id:id,
			status:newStatus,
			page:page
		})
		.then(result=>{
			const data = result.data;
			// console.log(data)
			if(data.code == 0){//登录成功
				message.success('更新上架/下架成功')
				dispatch(setPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getProductsDoneAction())
		})
	}
}
//处理更新是否热卖
export const getUpdateIsHotAction = (id,newIsHot)=>{
	return (dispatch,getState)=>{
		//发送请求之前显示loading状态
		const page = getState().get('product').get('current');
		dispatch(getProductsStartAction())
		apiObj.updateProductsIsHot({
			id:id,
			isHot:newIsHot,
			page:page
		})
		.then(result=>{
			const data = result.data;
			// console.log(data)
			if(data.code == 0){//登录成功
				message.success('更新是否热卖成功')
				dispatch(setPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getProductsDoneAction())
		})
	}
}
//处理更新排序
export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		//发送请求之前显示loading状态
		const page = getState().get('product').get('current');
		dispatch(getProductsStartAction())
		apiObj.updateProductsOrder({
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			const data = result.data;
			// console.log(data)
			if(data.code == 0){//登录成功
				message.success('更新排序成功')
				dispatch(setPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getProductsDoneAction())
		})
	}
}
//处理获取商品详情
const setProductDetailAction = (values)=>({
	type:types.SET_PRODUCT_DETAIL,
	payload:values
})
export const getProductDetailAction = (id)=>{
	return (dispatch,getState)=>{
		apiObj.getProductDetail({
			id:id,
		})
		.then(result=>{
			const data = result.data;
			// console.log(data)
			if(data.code == 0){//登录成功
				dispatch(setProductDetailAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
	}
}