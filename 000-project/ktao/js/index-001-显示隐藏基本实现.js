/*
* @Author: Chen
* @Date:   2020-05-25 17:27:55
* @Last Modified by:   Chen
* @Last Modified time: 2020-05-26 17:26:52
*/
;(function($){
/*顶部导航逻辑--------------------开始*/
	$('.top .dropdown')
	.hover(function(){
		var $this = $(this);
		var active = $this.data('active');
		$this.addClass(active+'-active');
	},function(){
		var $this = $(this);
		var active = $this.data('active');
		$this.removeClass(active+'-active');
	})

/*顶部导航逻辑--------------------结束*/
})(jQuery);