/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-14 09:21:13
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
import 'swiper/css/swiper.css';
// require('node_modules/swiper/swiper-bundle.min.css')
require('./index.css');


import Swiper from 'swiper';
var api = require('api');
var _util = require('util');
var categoriesTpl = require('./categories.tpl');
var adsTpl = require('./ads.tpl');
var floorsTpl = require('./floors.tpl');

var page = {
	init:function(){
		//1.加载首页分类数据
		this.loadHomeCategories()
		//2.集成swiper并加载广告数据
		this.loadSwiper()
		//3.首页加载楼层
		this.loadFloors();
	},
	loadHomeCategories:function(){
		api.getHomeCategories({
			success:function(categories){
				// console.log(categories)
				var html = _util.render(categoriesTpl,{
					categories:categories
				})
				$('.categories').html(html)
			}
		})
	},
	loadSwiper:function(){
		//加载广告
		api.getHomeAds({
			data:{
				position:1	
			},
			success:function(ads){
				// console.log(ads);
				var html = _util.render(adsTpl,{
					ads:ads
				})
				$('.swiper-wrapper').html(html)
				//配置swiper信息
				var mySwiper = new Swiper ('.swiper-container', {
					loop: true, // 循环模式选项
				    autoplay:true,//自动轮播
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				      //底部按钮可以点击
				      clickable :true,
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },
				})
			}
		})
		   
	},
	loadFloors:function(){
		api.getHomeFloors({
			success:function(floors){
				// console.log(floors)
				var html = _util.render(floorsTpl,{
					floors:floors
				})
				$('.floor-wrap').html(html)
			}
		})
	}
}

$(function(){
	page.init()
})