/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 10:44:05
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

var _util = require('util');
var api = require('api');
var tpl = require('./index.tpl');

var page = {
	paymentParams:{
		orderNo:_util.getParamsFromUrl('orderNo'),
	},
	init:function(){
		this.timer = 0;
		this.paymentBox = $('.payment-box')
		//加载订单信息
		this.loadOrderDetail()
	},
	loadOrderDetail:function(){
		var _this = this;
		if(this.paymentParams.orderNo){
			api.getPayments({
				data:{
					orderNo:_this.paymentParams.orderNo
				},
				success:function(data){
					// console.log(data)
					var html = _util.render(tpl,data)
					_this.paymentBox.html(html)
					//成功获取订单后,需要监听订单的状态
					//利用定时器每隔一定时间获取订单状态:根据订单状态进行不同的页面跳转处理
					_this.listenPaymentStatus()
				},
				error:function(){
					_this.paymentBox.html('<p class="empty-message">获取订单失败,请稍后再试!!!</p>')
				}
			})
		}else{
			_this.paymentBox.html('<p class="empty-message">没有该订单,请重新跳转页面</p>')
		}
	},
	listenPaymentStatus:function(){
		var _this = this;
		this.timer = setInterval(function(){
			api.getPaymentStatus({
				data:{
					orderNo:_this.paymentParams.orderNo
				},
				success:function(status){
					// console.log(status)
					if(status){
						//清除定时器
						clearInterval(_this.timer)
						window.location.href = '/result.html?type=payment&orderNo='+_this.paymentParams.orderNo
					}
				}
			})
		},1000)
	}
}

$(function(){
	page.init();
})

