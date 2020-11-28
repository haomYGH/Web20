//store 的计算属性
export default {
	shippings_List(state){
		var list = [];
		for(var i=0;i<state.shippingsList.length;i++){
			var obj = {};
			obj.id = state.shippingsList[i]._id;
			obj.name = state.shippingsList[i].name;
			obj.tel = state.shippingsList[i].phone;
			obj.address = state.shippingsList[i].province + state.shippingsList[i].city + state.shippingsList[i].county + state.shippingsList[i].address;
			list.push(obj)
		}
		return list
	},
	products_Data(state){
		return state.productsData
	},
}