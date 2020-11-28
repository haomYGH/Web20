require('@pages/common/nav')
require('@pages/common/footer')
require('@pages/common/search')
// require('!style-loader!css-loader!./style.css');
require('./style.css')

import Swiper from 'swiper';
import 'swiper/css/swiper.css';

var page = {
    init:function(){
		//1.加载首页分类数据
		this.loadHomeCategories()
        //2.集成swiper并加载广告数据
        this.loadSwiper()
	},
	loadHomeCategories:function(){//暂停
		// api.getHomeCategories({
		// 	success:function(categories){
		// 		// console.log(categories)
		// 		var html = _util.render(categoriesTpl,{
		// 			categories:categories
		// 		})
		// 		$('.categories').html(html)
		// 	}
		// })
	},
    loadSwiper:function(){
		var mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })        
		
		   
	},
}

$(function(){
    page.init()
})