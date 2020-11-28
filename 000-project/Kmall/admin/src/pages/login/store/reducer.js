/*
* @Author: Chen
* @Date:   2020-07-27 16:59:44
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-01 15:47:42
*/
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isFetching:false
})
import {
	LOGIN_START_ACTION,
	LOGIN_DONE_ACTION,
} from './actionTypes.js'

export default (state=defaultState,action)=>{
	if(action.type == LOGIN_START_ACTION){
		return state.set('isFetching',true)
	}
	else if(action.type == LOGIN_DONE_ACTION){
		return state.set('isFetching',false)
	}
	return state;
}