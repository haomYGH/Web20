import * as types from './types.js'
//拿到action.js处理后的结果去操作数据
export default {
	[types.GET_LIST](state,data){
		state.listContent = data.data
	},
}