import { fromJS } from 'immutable'

const defaultState = fromJS({
	list:[],
	total:0,
	pageSize:0,
	current:1,
	isFetching:false,
	categories:[]
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	//处理分类列表
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			current:action.payload.current
		})
	}
	else if(action.type == types.REQUEST_START_ACTION){
		return state.set('isFetching',true)
	}
	else if(action.type == types.REQUEST_DONE_ACTION){
		return state.set('isFetching',false)
	}
	//处理设置分类数据
	else if(action.type == types.SET_LEVEL_CATEGORIES){
		return state.set('categories',fromJS(action.payload))
	}
	
	return state;
}