/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 11:27:48
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
	ordersListParams:{
		keyword:_util.getParamsFromUrl('keyword'),
		page:_util.getParamsFromUrl('page') || 1,
	},
	init:function(){
		this.paginationBox = $('.pagination-box');
		//1.侧边栏选中状态
		this.renderSide()
		//2.加载订单列表
		this.loadordersList();
		//3.初始化分页器
		this.initPagination();
	},
	renderSide:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		var _this = this;
		//初始化
		this.paginationBox.pagination();
		//监听事件获取最新页码
		this.paginationBox.on('page-change',function(ev,page){
			_this.ordersListParams.page = page;
			_this.loadordersList();
		});
	},
	loadordersList:function(){
		var _this = this;
		api.getOrderList({
			data:_this.ordersListParams,
			success:function(orders){
				console.log(orders)
				if(orders.list.length > 0){
					//处理时间
					orders.list.forEach(function(order){
						order.createdTime = new Date(order.createdAt).toLocaleString();
					})

					var html = _util.render(tpl,orders)
					$('.order-box').html(html)
				}else{
					$('.order-box').html('<p class="empty-message">您还没有订单!!!</p>')
				}
				//构建分页器结构
				_this.paginationBox.pagination('render',{
					current:orders.current,
					pageSize:orders.pageSize,
					total:orders.total,
				});
			},
			error:function(){
				$('.order-box').html('<p class="empty-message">获取订单列表失败,请重试!!!</p>')
			}
		})
	}
}

$(function(){
	page.init();
})

