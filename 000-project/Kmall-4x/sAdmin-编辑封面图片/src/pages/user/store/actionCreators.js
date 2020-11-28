import * as types from './actionTypes.js'
import { request } from '@util'
import { GET_USERS } from '@api'

const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}
const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}

const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
export const getSetPageSizeAction = (payload)=>{
	return {
		type:types.SET_PAGE_SIZE,
		payload
	}
}
//当点击具体页码时
export const getPageAction = (page,pageSize)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			url:GET_USERS,
			data:{//请求携带的参数
				page:page,
				pageSize:pageSize
				
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
	}
}
//当点击单页分页数时
