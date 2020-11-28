import {
	GET_CAROUSEL_IMG
} from './types.js'
//拿到action.js处理后的结果去操作数据
export default {
    //ADD_TODO用中括号包裹起来的原因：？
	[GET_CAROUSEL_IMG](state,data){
		state.carouselImg = data
	},
}