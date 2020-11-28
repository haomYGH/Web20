/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 09:22:00
*/
var _nav = require('pages/common/nav');
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

var _util = require('util');
var api = require('api');
var shippingTpl = require('./shipping.tpl');
var productTpl = require('./product.tpl');

var _modal = require('./modal.js')

var page = {
	init:function(){
		this.shippingBox = $('.shipping-box');
		this.productBox = $('.product-box');
		//1.加载地址列表
		this.loadShippingList()
		//2.加载商品列表
		this.loadProductList()
		//3.绑定事件
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//监听自定义事件处理新增地址成功后获取最新地址信息
		this.shippingBox.on('get-shippings',function(ev,shippings){
			_this.renderShipings(shippings);
		})
		//1.点击新增地址弹出新增地址弹出层
		this.shippingBox.on('click','.shipping-add',function(){
			_modal.show();
		})
		//2.点击删除地址
		this.shippingBox.on('click','.shipping-delete',function(ev){
			//阻止事件冒泡防止点击时选中当前状态
			ev.stopPropagation();
			if(_util.showConfirmMsg('您确定要删除该地址吗?')){
				//删除地址需要获取该地址ID
				var shippingId = $(this).parents('.shipping-item').data('shipping-id');
				api.deleteShippings({
					data:{
						id:shippingId
					},
					success:function(shippings){
						_this.renderShipings(shippings);
					},
					error:function(){
						_util.showErrMsg('删除地址失败,请稍后再试!!!')
					}
				})
			}
		});
		//3.点击编辑地址
		this.shippingBox.on('click','.shipping-edit',function(ev){
			//阻止事件冒泡防止点击时选中当前状态
			ev.stopPropagation();
			var $this = $(this);
			//编辑地址需要获取当前地址ID
			var shippingId = $this.parents('.shipping-item').data('shipping-id');
			api.getShippingsDetail({
				data:{
					id:shippingId
				},
				success:function(shipping){
					//获取目标地址信息显示弹出层
					_modal.show(shipping);
				},
				error:function(){
					_util.showErrMsg('获取地址失败,请稍后再试!!!')
				}
			})
		});
		//4.点击地址选中状态
		this.shippingBox.on('click','.shipping-item',function(){
			//选中状态
			var $this = $(this)
			$this.addClass('active')
			.siblings('.shipping-item')
			.removeClass('active')

			//获取当前选中地址的ID
			_this.selectShippingId = $this.data('shipping-id');
		});
		//5.点击支付功能
		this.productBox.on('click','.btn-submit',function(){
			var $this = $(this);
			if(_this.selectShippingId){
				//支付:创建订单,去订单支付页面
				api.addOrders({
					data:{
						shippingId:_this.selectShippingId
					},
					success:function(order){
						window.location.href = './payment.html?orderNo='+order.orderNo
					},
					error:function(){
						_util.showErrMsg('创建订单失败,请稍后再试!!!')
					}
				})
			}else{
				_util.showErrMsg('请选择送货地址!!!')
			}
		})
	},
	renderShipings:function(shippings){
		var _this = this;
		//每一次重新渲染地址列表前保存渲染前选中状态
		shippings.forEach(function(shipping){
			if(shipping._id == _this.selectShippingId){
				shipping.active = true;
			}
		})
		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
		this.shippingBox.html(html)
	},
	loadShippingList:function(){
		var _this = this
		api.getShippingsList({
			success:function(data){
				// console.log(data)
				/*
				var html = _util.render(shippingTpl,{
					shippings:data
				})
				_this.shippingBox.html(html)
				*/
				_this.renderShipings(data)
			}
		})
	},
	loadProductList:function(){
		var _this = this
		api.getOrdersList({
			success:function(data){
				// console.log(data)
				if(data.cartList.length > 0 ){
					var html = _util.render(productTpl,data)
					_this.productBox.html(html)
				}else{
					_this.productBox.html('<p class="empty-message">您没有添加商品,请去添加商品再结算!!!</p>')
				}
			},
			error:function(err){
				_this.productBox.html('<p class="empty-message">获取商品列表失败,请重试!!!</p>')
			}
		})
		
	},
}

$(function(){
	page.init();
})

