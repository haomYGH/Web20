/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-15 11:36:44
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css');

var _util = require('util');
var api = require('api');
var tpl = require('./index.tpl');

var page = {
	productsDetailParams:{
		id:_util.getParamsFromUrl('productId'),
	},
	init:function(){
		this.detailBox = $('.detail-box');
		//1.加载详情页数据
		this.loadProductsDetail();
		//2.绑定事件
		this.bindEvent();

	},
	bindEvent:function(){
		var _this = this
		//1.商品图片切换
		this.detailBox.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this);
			//选中状态
			$this.addClass('active')
			.siblings('.product-small-img-item')
			.removeClass('active')
			//获取图片地址
			var src = $this.find('img').attr('src');
			_this.detailBox.find('.product-main-img')
			.find('img').attr('src',src)
		})
		//2.点击增加/减少商品数量
		this.detailBox.on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $('.count-input')
			var current = parseInt($input.val())
			//增加
			if($this.hasClass('plus')){
				$input.val(current >= _this.stock ? _this.stock : current+1)
			}
			//减少
			else if($this.hasClass('minus')){
				$input.val(current > 1 ? current -1 : 1 )
			}
		})
		//3.添加购物车
		this.detailBox.on('click','.add-cart-btn',function(){
			var count = $('.count-input').val()
			api.addCarts({
				data:{
					productId:_this.productsDetailParams.id,
					count:count
				},
				success:function(result){
					_util.goResult('addCart')
				}
			})
		})

	},
	loadProductsDetail:function(){
		var _this = this;
		if(this.productsDetailParams.id){
			api.getProductDetail({
				data:_this.productsDetailParams,
				success:function(productDetail){
					//绑定库存
					_this.stock = productDetail.stock;

					productDetail.images = productDetail.images.split(',')
					productDetail.activeImage = productDetail.images[0]
					// console.log(productDetail)
					var html = _util.render(tpl,productDetail)
					_this.detailBox.html(html)
				}
			})
		}
		
	}
}

$(function(){
	page.init();
})

