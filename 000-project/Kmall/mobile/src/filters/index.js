/*
* @Author: Chen
* @Date:   2020-08-28 16:58:15
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-28 17:04:55
*/
export default {
	formatPrice:function(price=0){
		return '￥'+parseFloat(price).toFixed(2)
	}
}