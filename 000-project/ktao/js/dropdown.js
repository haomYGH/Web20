/*
* @Author: Chen
* @Date:   2020-05-28 15:51:57
* @Last Modified by:   haom
* @Last Modified time: 2020-06-10 19:38:16
*/
//面向对象方式把showhide插件进行封装
;(function($){
	function Dropdown($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer = this.$elem.find('.dropdown-layer');
		this.active = this.$elem.data('active') + '-active';//menu-active样式
		//2.初始化
		this.init()
	}
	Dropdown.prototype = {
		constructor:Dropdown,
		init:function(){
			//1.初始化显示隐藏插件
			this.$layer.showHide(this.options);
			//2.监听显示隐藏事件
			this.$layer.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type)
			}.bind(this));
			//3.绑定事件
			this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
		},
		show:function(){
			this.Timer = setTimeout(function(){
				this.$layer.showHide('show');
				//显示时添加类
				this.$elem.addClass(this.active);			
			}.bind(this),this.options.delay);
		},
		hide:function(){
			clearTimeout(this.Timer);
			this.$layer.showHide('hide');
			//隐藏时删除类
			this.$elem.removeClass(this.active);
		}
	}

	Dropdown.DEFAULTS = {
		js:true,
		mode:'fade',
		delay:200,
		ev:'click'
	}

$.fn.extend({
	dropdown:function(options){
		return this.each(function(){
			var $elem = $(this);
			var dropdown = $elem.data('dropdown');
			//单例模式
			if(!dropdown){
				options = $.extend({},Dropdown.DEFAULTS,options);
				dropdown = new Dropdown($elem,options);//实例化并传入参数
				$elem.data('dropdown',dropdown);
			}
			if(typeof dropdown[options] == 'function'){
				dropdown[options]();
			}
		});
	}
})
})(jQuery);