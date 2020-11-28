import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	usernum:0,
	productnum:0,
	ordernum:0
})

export default (state=defaultState,action)=>{
	/*
		return是直接结束当前函数返回 

		break是直接结束当前循环返回 
		所以：用了return就不能再用break了
	*/
	switch(action.type){
		case types.SET_COUNT:
			return state.merge({
				usernum:action.payload.usernum,
				productnum:action.payload.productnum,
				ordernum:action.payload.ordernum
			});
		default:
			return state;
	}	
}