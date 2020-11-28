//过滤器。格式化。注册到全局main.js
export default {
	formatPrice:function(price=0){//价格格式
		return '￥'+parseFloat(price).toFixed(2)
	}
}