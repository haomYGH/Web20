/*
* @Author: Administrator
* @Date:   2020-06-12 16:15:13
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-15 13:45:21
*/
;(function($){
	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$carouselItem = $elem.find('.carousel-item');
		this.$controls = $elem.find('.control');
		this.$btns = $elem.find('.btn-item');

		this.$itemsLength = this.$carouselItem.length;
		this.now = this._getCorrectIndex(this.options.activeIndex);
		this.timer = 0;
		//2.初始化
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			if(this.options.slide){
				console.log('用move');
				//移除所有,默认显示第一张
				this.$elem.addClass('slide');
				this.$carouselItem.eq(this.now).css({left:0});
				//记录当前容器的宽度
				this.itemWidth = this.$carouselItem.eq(this.now).width();
				//底部按钮默认选中
				this.$btns.eq(this.now).addClass('active');
				//监听鼠标移入移出显示左右按钮
				this.$elem.hover(function(){
					this.$controls.show();
				}.bind(this),function(){
					this.$controls.hide();
				}.bind(this))
				//5初始化move插件
				this.$carouselItem.move(this.options);
				//4点击controls实现图片切换(通过事件代理选中切换按钮control)
				this.$elem.on('click','.control-left',function(){
					this._slide(this._getCorrectIndex(this.now-1),1)
				}.bind(this))
				this.$elem.on('click','.control-right',function(ev){
					ev.stopPropagation();//阻止冒泡,防止自动轮播时影响搜索框
					this._slide(this._getCorrectIndex(this.now+1),-1)
				}.bind(this))
			}else{
				//1隐藏所有,显示默认图片
				this.$elem.addClass('fade');
				this.$carouselItem.eq(this.now).show();
				//2底部圆点跟随选中
				this.$btns.eq(this.now).addClass('active');
				//3控制左右按钮什么时候显示
				this.$elem.hover($.proxy(function(){this.$controls.show();},this),function(){
					this.$controls.hide();
				}.bind(this))
				//5.初始化显示隐藏插件
				this.$carouselItem.showHide(this.options);
				//4点击controls实现图片切换(通过事件代理选中切换按钮control)
				this.$elem.on('click','.control-left',function(){
					this._fade(this._getCorrectIndex(this.now-1))
				}.bind(this))
				this.$elem.on('click','.control-right',function(ev){
					ev.stopPropagation();//阻止冒泡,防止自动轮播时影响搜索框
					/*
					this.$carouselItem.eq(this.now).showHide('hide');
					this.$carouselItem.eq(this.now+1).showHide('show');
					this.$btns.eq(this.now).removeClass('active');
					this.$btns.eq(this.now+1).addClass('active');
					this.now++;
					*/
					this._fade(this._getCorrectIndex(this.now+1))
				}.bind(this))
				//6监听底部按钮事件
				var _this = this;
				this.$btns.on('click',function(){
					var index = _this.$btns.index(this);
					_this._fade(index)
				})
				//7是否自动轮播
				if(this.options.autoplay){
					//自动轮播
					this.autoplay();
					//鼠标移入停止轮播
					this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
				}
			}
		},
		_fade:function(index){
			//index表示将要显示的图片
			//如果当前显示和将要显示的时通一张,就终止此函数
			if(index == this.now) return;
			//1隐藏当前
			this.$carouselItem.eq(this.now).showHide('hide');
			//2显示将要显示的
			this.$carouselItem.eq(index).showHide('show');
			//3底部按钮更新
			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');
			//更新索引值
			this.now = index;
		},
		_slide:function(index,direation){
			//index代表将要显示的图片下标
			//direation代表方向：1代表正方向，-1代表反方向
			//1.移走当前
			this.$carouselItem.eq(this.now).move('x',-1*direation*this.itemWidth);
			//2.移入将要显示的
			this.$carouselItem.eq(index).move('x',0);
			//3.底部按钮更新
			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');			
			//4.更新索引值
			this.now = index;
		},
		_getCorrectIndex:function(num){
			if(num >= this.$itemsLength) return 0;
			if(num < 0) return this.$itemsLength-1;
			return num;
		},
		autoplay:function(ev){

			clearInterval(this.timer);//定时器开始前需要先清除上一次定时器
			this.timer = setInterval(function(){
				this.$controls.eq(1).trigger('click');
			}.bind(this),this.options.autoplay)
		},
		paused:function(){
			clearInterval(this.timer)
		}
	}
	Carousel.DEFAULTS = {
		slide:true,
		activeIndex:1,
		js:true,
		mode:'fade',
		autoplay:2000
	}

$.fn.extend({
	carousel:function(options,val){
		return this.each(function(){
			var $elem = $(this);
			var carousel = $elem.data('carousel');
			if(!carousel){
				options = $.extend({},Carousel.DEFAULTS,options);
				carousel = new Carousel($elem,options);
				$elem.data('carousel',carousel);
			}
			if(typeof carousel[options] == 'function'){
				carousel[options](val);
			}

		});
	}
})
})(jQuery);