/*
* @Author: Chen
* @Date:   2020-07-27 16:59:44
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-03 11:33:00
*/
import { fromJS } from 'immutable';

const defaultState = fromJS({
	usernum:0,
	productnum:0,
	ordernum:0
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	if(action.type == types.SET_COUNTS){
		return state.merge({
			usernum:action.payload.usernum,
			productnum:action.payload.productnum,
			ordernum:action.payload.ordernum,
		})
	}
	return state;
}