import * as types from './types.js'
//拿到action.js处理后的结果去操作数据
export default {
    //ADD_TODO用中括号包裹起来的原因：？
	[types.GET_ADS](state,data){
		state.homeAds = data.data
	},
	[types.GET_HOT_CATEGORIES](state,data){
		state.homeHotCategories = data.data
	},
	[types.GET_HOME_FLOORS](state,data){
		state.homeFloors = data.data
	},
}