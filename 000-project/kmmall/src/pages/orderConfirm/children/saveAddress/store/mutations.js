import * as types from './types.js'
//拿到action.js处理后的结果去操作数据
export default {
    //ADD_TODO用中括号包裹起来的原因：？
	[types.SAVE_ADDRESS](state,data){
		state.addressObj = data
	},
}