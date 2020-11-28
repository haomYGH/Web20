/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-15 17:44:16
*/
var _nav = require('pages/common/nav');
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

var _util = require('util');
var api = require('api');
var tpl = require('./index.tpl');

var page = {
	init:function(){
		this.$cartBox = $('.cart .cart-box')
		//1.加载购物车商品信息
		this.loadCarts();
		//2.绑定事件
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//1.单个选中/取消状态
		this.$cartBox.on('click','.select-one',function(){
			var $this = $(this);
			//更新选中状态需要获取当前商品的ID
			var productId = $this.parents('.product-item').data('product-id');
			//选中
			if($this.is(':checked')){
				api.updateCartsChoice({
					data:{
						productId:productId,
						checked:true
					},
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(err){
						_this.showErrPage()
					}
				})
			}
			//取消
			else{
				api.updateCartsChoice({
					data:{
						productId:productId,
						checked:false
					},
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(err){
						_this.showErrPage()
					}
				})
			}
		})
		//2.全选/全不选
		this.$cartBox.on('click','.select-all',function(){
			var $this = $(this);
			//选中
			if($this.is(':checked')){
				api.updateCartsChoice({
					data:{
						checked:true
					},
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(err){
						_this.showErrPage()
					}
				})
			}
			//取消
			else{
				api.updateCartsChoice({
					data:{
						checked:false
					},
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(err){
						_this.showErrPage()
					}
				})
			}
		})
		//3.删除单个商品
		this.$cartBox.on('click','.delete-one',function(){
			var $this = $(this);
			if(_util.showConfirmMsg('您确定要删除该商品吗?')){
				api.deleteCarts({
					data:{
						productId:productId
					},
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(err){
						_this.showErrPage()
					}
				})
			}
		})
		//4.删除选中的商品:由于商品状态全部存在后台,所以前台不需要传递参数
		this.$cartBox.on('click','.delete-selected',function(){
			var $this = $(this);
			if(_util.showConfirmMsg('您确定要删除选中的商品吗?')){
				api.deleteCarts({
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(err){
						_this.showErrPage()
					}
				})
			}
		})
		//5.增加/减少商品数量
		this.$cartBox.on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $this.siblings('.count-input');
			//更新商品数量需要获取当前商品的ID
			var productId = $this.parents('.product-item').data('product-id');
			//获取当前商品数量
			var current = parseInt($input.val())
			var count = current
			//获取商品库存
			var stock = $input.data('stock');
			//增加
			if($this.hasClass('plus')){
				if(current >= stock){
					_util.showErrMsg('商品数量不能超过库存')
					return 
				}
				$input.val(current + 1)
				count = current + 1
			}
			//减少
			else if($this.hasClass('minus')){
				if(current <= 1){
					_util.showErrMsg('商品数量不能少于1件')
					return 
				}
				$input.val(current - 1)
				count = current - 1
			}
			//发送请求更新商品数量
			api.updateCartsCounts({
				data:{
					productId:productId,
					count:count
				},
				success:function(data){
					_this.renderCarts(data)
				},
				error:function(err){
					_this.showErrPage()
				}
			})
		})
		//6.去结算
		this.$cartBox.on('click','.btn-submit',function(){
			// console.log(_this.totalCartPrice)
			if(_this.totalCartPrice <= 0){
				_util.showErrMsg('请添加商品再结算!!!')
			}else{
				window.location.href = './order-confirm.html';
			}
		})
	},
	renderCarts:function(data){
		//为了保持购物车数量数据同步,渲染购物车是调用获取购物车数量方法
		_nav.loadCarts();
		// console.log(_nav)
		//处理结算时需要获取总价格,将总价格缓存下来
		this.totalCartPrice = data.totalCartPrice

		if(data.cartList.length > 0){
			var html = _util.render(tpl,data);
			this.$cartBox.html(html)
		}else{
			this.$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
		}
	},
	showErrPage:function(){
		this.$cartBox.html('<p class="empty-message">请求出错啦,请稍后再试!!!</p>')
	},
	loadCarts:function(){
		var _this = this;
		api.getCarts({
			success:function(data){
				// console.log(data);
				/*
				if(data.cartList.length > 0){
					var html = _util.render(tpl,data);
					_this.$cartBox.html(html)
				}else{
					_this.$cartBox.html('<p class="empty-message">您的购物车空空如也.....</p>')
				}
				*/
				_this.renderCarts(data)
			},
			error:function(err){
				// _this.$cartBox.html('<p class="empty-message">请求出错啦,请稍后再试!!!</p>')
				_this.showErrPage()
			}
		})
	}
}

$(function(){
	page.init();
})

