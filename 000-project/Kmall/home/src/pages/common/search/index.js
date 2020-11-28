/*
* @Author: Chen
* @Date:   2020-08-10 11:27:30
* @Last Modified by:   Administrator
* @Last Modified time: 2020-08-30 12:51:14
*/
require('./index.css');

var page = {
	init:function(){
		//绑定事件
		this.bindEvent()
	},
	bindEvent:function(){
		$('#btn-search').on('click',function(){
			var val = $.trim($('#search-input').val());
			window.location.href = '/list.html?keyword='+val
		})	
		//监听键盘事件提交表单
		$('#search-input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				$('#btn-search').trigger('click');
			}
		})
	},
}

$(function(){
	page.init()
})