/*
* @Author: Administrator
* @Date:   2020-06-12 16:15:13
* @Last Modified by:   haom
* @Last Modified time: 2020-06-17 22:55:59
*/
;(function($){
	function Tab($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$items = this.$elem.find('.tab-item');
		this.$panels = this.$elem.find('.tab-panel');
		this.$itemsLength = $elem.find('.tab-item').length;

		this.now = this._getCorrectIndex(this.options.activeIndex);
		this.timer = 0;
		//2.初始化
		this.init();
	}
	Tab.prototype = {
		constructor:Tab,
		init:function(){
			var _this=this;
			//4.初始化显示隐藏插件
			this.$panels.showHide(this.options);
			//1.初始化显示默认选中按钮
			this.$items.eq(this.now).addClass('tab-item-active');
			this.$panels.eq(this.now).showHide('show');
			//3.监听事件切换选项卡(还是通过事件代理)
			var eventType = '';
			if(this.options.eventName){
				eventType = this.options.eventName;
			}else{
				eventType='mouseenter';//也就是默认hover事件
			}
			this.$elem.on(eventType,'.tab-item',function(){
				var index = _this.$items.index(this);
				_this._toggle(index);
			})
			//7是否自动轮播
			if(this.options.autoplay){
				//自动轮播
				this.autoplay();
				//鼠标移入停止轮播
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this));
			}			
		},
		_toggle:function(index){
			//4.如果当前显示和将要显示的相同的话就不重复执行
			if(index == this.now) return;
			//1隐藏当前
			this.$items.eq(this.now).removeClass('tab-item-active');
			this.$panels.eq(this.now).showHide('hide');
			//2显示将要显示的
			this.$items.eq(index).addClass('tab-item-active');
			this.$panels.eq(index).showHide('show');
			//3更新索引值
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
				this._toggle(this._getCorrectIndex(this.now+1));
			}.bind(this),this.options.autoplay)
		},
		paused:function(){
			clearInterval(this.timer)
		}
	}
	Tab.DEFAULTS = {
		activeIndex:0,
		js:true,
		mode:'fade',
		autoplay:2000,
		eventName:'click'
	}

$.fn.extend({
	tab:function(options){
		return this.each(function(){
			var $elem = $(this);
			var tab = $elem.data('tab');
			if(!tab){
				options = $.extend({},Tab.DEFAULTS,options);
				tab = new Tab($elem,options);
				$elem.data('tab',tab);
			}
			if(typeof tab[options] == 'function'){
				tab[options]();
			}

		});
	}
})
})(jQuery);