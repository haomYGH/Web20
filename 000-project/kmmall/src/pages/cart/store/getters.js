//store 的计算属性
export default {
	cartsDatas(state){
		return state.cartsData
	},
	cartListLength(state){
		if(state.cartsData.cartList){
			return state.cartsData.cartList.length
		}else{
			return 0
		}
		
	}
}