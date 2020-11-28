//store 的计算属性
export default {
	detailData(state){
		return state.detailData
	},
	productImages(state){
		if(state.detailData.images){
			return state.detailData.images.split(',')
		}
	}
}