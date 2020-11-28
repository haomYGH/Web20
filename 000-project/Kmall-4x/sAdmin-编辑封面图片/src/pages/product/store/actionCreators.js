import axios from 'axios'
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from '@util'
import { ADD_PRODUCT,Get_LevelCategories,Get_CategoriesList,GET_ProductsList,api_Update_IsShow,api_Update_Status,api_Update_IsHot,api_Update_Order,api_GET_ProductEdit } from '@api'

//自定义错误状态errorInfo
export const getErrorInfoPrductsAction = (errState)=>({
	type:types.SET_ErrorInfo,
	payload:errState
})
const setMainImageErrAction = ()=>({
	type:types.SET_MAIN_IMAGE_ERR,
})
const setImagesErrAction = ()=>({
	type:types.SET_IMAGES_ERR,
})
//处理新增/编辑商品
export const getSavePrductsAction = (values)=>{
	return (dispatch,getState)=>{
		// console.log(getState().get('product').get('mainImage'))
		const mainImage = getState().get('product').get('mainImage');
		const images = getState().get('product').get('images');
		const detail = getState().get('product').get('detail');
		//如果自定义组件某个值为空时，也让状态errorSave为true,并且显示提示信息(detail可以为空)
		if(!mainImage){
			dispatch(getErrorInfoPrductsAction(true));//导出去的可以在本文件调用吗
			dispatch(setMainImageErrAction())
		}
		if(!images){
			dispatch(getErrorInfoPrductsAction(true));
			dispatch(setImagesErrAction())
		}
		// console.log('是否bu发送请求:',getState().get('product').get('errorInfo'))
		//只有当组件验证和自定义组件验证都通过的时候再发送请求，新增商品
		//也就是当状态errorInfo为false时
		if(getState().get('product').get('errorInfo')){
			return
		}
//判断新增还是编辑(更新):通过在values上添加的id来判断
//路由上：新增商品和更新商品区别在于请求方式,地址和其他都一样
let method = 'post'
if(values.id){
	method = 'put'
}
console.log(method,values)
		//参数信息要和数据库接口参数保持一致
		request({
            method:method,
			url:ADD_PRODUCT,
			data:{
				...values,
				mainImage,
				images,
				detail
			}
        })
		.then(result=>{
			// console.log(result)
			if(result.code == 0){//登录成功
				message.success(result.message,()=>{
					window.location.href = '/product'
				})
			}else{//登录失败
				message.error(result.message)
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
//处理获取最新父级分类
export const getLevelCategoriesAction = ()=>{
	return (dispatch,getState)=>{
		request({
			url:Get_LevelCategories,
			data:{
				level:3
			}
        })
		.then(result=>{
			if(result.code == 0){//登录成功
				dispatch(setLevelCategories(result.data))
			}else{//登录失败
				message.error(result.message)
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
		request({
			url:GET_ProductsList,
			data:{
				page
			}
        })
		.then(result=>{
			const data = result.data;
			if(result.code == 0){//登录成功
				dispatch(setPageAction(data))
			}else{//登录失败
				message.error(result.message)
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

//处理是否首页显示
//思路：我们需要拿到派发过来的数据，然后修改数据库中的数据，数据库修改成功,派发action重新渲染组件
export const getUpdateIsShowAction = (id,newIsShow)=>{
	return (dispatch,getState)=>{//使用中间件配置后可以返回一个函数，函数的第一个参数是dispatch
		//发送请求之前显示loading状态
		dispatch(getProductsStartAction())
		request({
			method:'put',
			url:api_Update_IsShow,
			data:{
				id:id,
				isShow:newIsShow,
				page:getState().get('product').get('current')
			}
        })
		.then(result=>{
			if(result.code == 0){//更新成功
				message.success('更新显示隐藏成功')
				dispatch(setPageAction(result.data))//派发action修改store数据
			}else{//code=10登录失败
				message.error(result.message)
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
		dispatch(getProductsStartAction())
		request({
			method:'put',
			url:api_Update_Status,api_Update_IsHot,
			data:{
				id:id,
				status:newStatus,
				page:getState().get('product').get('current')
			}
        })
		.then(result=>{
			// console.log(data)
			if(result.code == 0){//更新成功
				message.success('更新上架/下架成功')
				dispatch(setPageAction(result.data))
			}else{//登录失败
				message.error(result.message)
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
		dispatch(getProductsStartAction())
		request({
			method:'put',
			url:api_Update_IsHot,
			data:{
				id:id,
				isHot:newIsHot,
				page:getState().get('product').get('current')
			}
        })
		.then(result=>{
			if(result.code == 0){//更新成功
				message.success('更新是否热卖成功')
				dispatch(setPageAction(result.data))
			}else{//登录失败
				message.error(result.message)
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
		dispatch(getProductsStartAction())
		request({
			method:'put',
			url:api_Update_Order,
			data:{
				id:id,
				order:newOrder,
				page:getState().get('product').get('current')
			}
        })
		.then(result=>{
			if(result.code == 0){//更新成功
				message.success('更新排序成功')
				dispatch(setPageAction(result.data))
			}else{//登录失败
				message.error(result.message)
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

//处理商品编辑
const setProductEditAction = (values)=>({
	type:types.SET_PRODUCT_Edit,
	payload:values
})
export const getProductEditAction = (id)=>{
	return (dispatch,getState)=>{
		request({
			url:api_GET_ProductEdit,
			data:{
				id:id,
			}
        })
		.then(result=>{
			// console.log(result)
			if(result.code == 0){//登录成功
				dispatch(setProductEditAction(result.data))
			}else{//登录失败
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
	}
}