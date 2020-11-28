/*
* @Author: Administrator
* @Date:   2020-06-19 17:06:01
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-20 09:06:07
*/
;(function(win,doc){
	var oHtml = document.querySelector('html');
	function reSize(){
		//获取适口宽度
		var oWidth = document.body.clientwidth || document.documentElement.clientWidth;
		oHtml.style.fontSize = (oWidth/10)+'px';
	}
	win.addEventListener('load',reSize,false);
	win.addEventListener('resize',reSize,false);
	win.addEventListener('DOMContentLoaded',reSize,false);
})(window,document);