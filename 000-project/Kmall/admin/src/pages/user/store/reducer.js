/*
* @Author: Chen
* @Date:   2020-07-27 16:59:44
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-04 10:21:45
*/
import { fromJS } from 'immutable';

const defaultState = fromJS({
	list:[],
	total:0,
	pageSize:0,
	current:1,
	isFetching:false
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		// console.log(action.payload)
		return state.merge({
			list:fromJS(action.payload.list),
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			current:action.payload.current
		})
	}
	else if(action.type == types.GET_COUNTS_START_ACTION){
		return state.set('isFetching',true)
	}
	else if(action.type == types.GET_COUNTS_DONE_ACTION){
		return state.set('isFetching',false)
	}
	
	return state;
}