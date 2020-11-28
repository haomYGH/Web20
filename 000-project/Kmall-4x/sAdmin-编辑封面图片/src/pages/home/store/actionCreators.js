//引入action_type
import * as types from './actionTypes'
import { request } from '@util'
import { ADMIN_COUNTS } from '@api'

const setCountAction = (payload)=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}


export const getCountAction = ()=>{
	return (dispatch)=>{
		request({
			url:ADMIN_COUNTS
		})
		.then(result=>{
			if(result.code == 0){
				const action = setCountAction(result.data)
				dispatch(action)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}