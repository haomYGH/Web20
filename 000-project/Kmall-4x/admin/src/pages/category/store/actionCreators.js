import axios from 'axios'
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from '@util'
import { Add_Categories,Get_LevelCategories,Get_CategoriesList,UPDATE_CATEGORY_Name,UPDATE_CATEGORY_mobileName,UPDATE_CATEGORY_Order,UPDATE_CATEGORY_isShow } from '@api'

//处理新增分类
export const getAddCategoriesAction = (values)=>{
	return (dispatch,getState)=>{
		request({
            method:'post',
			url:Add_Categories,
			data:values
        })
		.then(result=>{
			if(result.code == 0){//登录成功
				message.success('添加分类成功!')
				dispatch(setLevelCategories(result.data))
			}else{//登录失败
				message.error(result.message)
			}
		})
		.catch(err=>{
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
				level:2
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
			message.error('请求失败,请稍后再试!!')
		})
	}
}
//处理分类列表分页数据
export const setPageAction = (val)=>({
	type:types.SET_PAGE,
	payload:val
})
export const getCategoriesStartAction = ()=>({
	type:types.REQUEST_START_ACTION
})
export const getCategoriesDoneAction = ()=>({
	type:types.REQUEST_DONE_ACTION
})


export const getPageAction = (page)=>{
	return (dispatch,getState)=>{
		//发送请求之前显示loading状态
		dispatch(getCategoriesStartAction())
		request({
			url:Get_CategoriesList,
			data:{
				page:page
			}
        })
		.then(result=>{
			if(result.code == 0){//登录成功
				dispatch(setPageAction(result.data))
			}else{//登录失败
				message.error(result.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getCategoriesDoneAction())
		})
	}
}

//处理更新分类名称
export const getUpdateNameAction = (newName,id)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY_Name,
			data:{
				name:newName,
				id:id,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新分类name成功')
				dispatch(setPageAction(result.data))
			}
		})
	}	
}
export const getUpdateMobileNameAction = (newName,id)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY_mobileName,
			data:{
				mobileName:newName,
				id:id,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新分类mobileName成功')
				dispatch(setPageAction(result.data))
			}
		})
	}	
}
export const getUpdateOrderAction = (newOrder,id)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY_Order,
			data:{
				order:newOrder,
				id:id,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新分类order成功')
				dispatch(setPageAction(result.data))
			}
		})
	}	
}
export const getUpdateIsShowAction = (newIsShow,id)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY_isShow,
			data:{
				isShow:newIsShow,
				id:id,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新分类isShow成功')
				dispatch(setPageAction(result.data))
			}
		})
	}	
}