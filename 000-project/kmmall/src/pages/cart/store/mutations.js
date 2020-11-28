import * as types from './types.js'
//拿到action.js处理后的结果去操作数据
export default {
    //ADD_TODO用中括号包裹起来的原因：？
	[types.GET_CARTS_DATA](state,data){
		state.cartsData = data.data;
		state.cartListLength = data.data.cartList.length;
	},
	[types.SET_ITEM_CHECKED](state,data){
		state.cartsData = data.data
	},
	[types.SET_ITEM_COUNT](state,data){
		state.cartsData = data.data
	},
	[types.SET_CHOICES](state,data){
		state.cartsData = data.data
	},
	[types.DELETE_CHOICES](state,data){
		state.cartsData = data.data
	},
}