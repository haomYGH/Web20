import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isFetching:false
})

export default (state=defaultState,action)=>{
	
	if(action.type === types.LOGIN_REQUEST){
		//1.发送登录请求前把state里面的isFetching改为true并且返回一个新的数据
		//2.当数据返回给store时,执行组件中的mapStateToProps方法重新映射数据
		//3.UI组件中的this.props中的数据发生改变,导致UI页面发生改变
		return state.set('isFetching',true)
	}
	if(action.type === types.LOGIN_DONE){
		return state.set('isFetching',false)
	}

	return state;
}