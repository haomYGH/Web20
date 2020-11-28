/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 16:33:04
*/
require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css');

var _util = require('util');
var api = require('api');
var tpl = require('./index.tpl');
var pagination = require('util/pagination');

var page = {
	ordersDetailParams:{
		orderNo:_util.getParamsFromUrl('orderNo'),
	},
	init:function(){
		this.orderBox = $('.order-box')
		//1.侧边栏选中状态
		this.renderSide()
		//2.加载订单列表
		this.loadordersDetail();
		//3.监听事件
		this.bindEvent();
	},
	renderSide:function(){
		_side.render('order-list')
	},
	bindEvent:function(){
		var _this = this
		this.orderBox.on('click','.btn-cancel',function(){
			if(_util.showConfirmMsg('您确定要取消该订单吗?')){
				api.updateOrderStatus({
					data:{
						orderNo:_this.ordersDetailParams.orderNo,
						status:20
					},
					success:function(order){
						_this.renderOrderDetail(order)
					},
					error:function(msg){
						_util.showErrMsg(msg)
					}
				})
			}
		})
	},
	renderOrderDetail:function(order){
		if(order){
			//处理时间
			order.createdTime = new Date(order.createdAt).toLocaleString();
			//是否显示支付和取消按钮
			order.canPay = order.canCancel = order.status == 10
			var html = _util.render(tpl,order)
			this.orderBox.html(html)
		}else{
			this.orderBox.html('<p class="empty-message">您还没有订单!!!</p>')
		}
	},
	loadordersDetail:function(){
		var _this = this;
		api.getOrderDetail({
			data:_this.ordersDetailParams,
			success:function(order){
				// console.log(order)
				_this.renderOrderDetail(order)
			},
			error:function(){
				_this.orderBox.html('<p class="empty-message">获取订单详情失败,请重试!!!</p>')
			}
		})
	}
}

$(function(){
	page.init();
})

