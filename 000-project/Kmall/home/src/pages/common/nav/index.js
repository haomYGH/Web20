/*
* @Author: Chen
* @Date:   2020-08-10 11:27:30
* @Last Modified by:   haom
* @Last Modified time: 2020-09-10 22:00:17
*/
require('./index.css');
var api = require('api')
var _util = require('util')

var page = {
	init:function(){
		//加载登录的用户名
		this.loadUsername()
		//绑定事件
		this.bindEvent()
		//加载购物车数量
		this.loadCarts()
		// console.log(this);
		// return this;
	},
	loadCarts:function(){
		var $cartNum = $('.cart-num');
		api.getCartsCount({
			success:function(count){
				$cartNum.text(count || 0)
			},
			error:function(){
				$cartNum.text(0)
			}
		})
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			api.logout({
				success:function(result){
					// console.log(result)
					window.location.reload()
				},
				error:function(msg){
					_util.showErrMsg(msg)
				}
			})
		})
	},
	loadUsername:function(){
		api.getUsername({
			success:function(data){
				$('.not-login').hide()
				$('.login')
				.show()
				.find('.username')
				.text(data.username)
			}
		})
		/*
		$.ajax({
			url:'/sessions/username',
			method:'get',
			dataType:'json',
			success:function(result){
				$('.not-login').hide()
				$('.login')
				.show()
				.find('.username')
				.text(result.data.username)
			}
		})
		*/
	}
}

$(function(){
	page.init()
})
module.exports = page