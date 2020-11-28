import * as types from './types.js'
//拿到action.js处理后的结果去操作数据
export default {
	[types.GET_CATEGORY_SIDE](state,data){
		state.categorySide = data.data
	},
	[types.GET_INIT_CONTENT](state,data){
		state.categoryContent = data.data
	},
	[types.GET_CATEGORY_CONTENT](state,data){
		state.categoryContent = data.data
	},
}