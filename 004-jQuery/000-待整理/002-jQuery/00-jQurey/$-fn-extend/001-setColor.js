//JQ扩展插件推荐方法$.fn.extend({})
$.fn.extend({
	setColor:function(options){
		var DEFAULTS = {color:'red'}
		var options = $.extend({},DEFAULTS,options);
		return this.each(function(){
			this.style.color = options.color;
		});							
	}
})