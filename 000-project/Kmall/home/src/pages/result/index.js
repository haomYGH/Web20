/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 10:49:47
*/
require('pages/common/logo')
require('pages/common/footer')
require('./index.css');
var _util = require('util');


$(function(){
	// $('.register').show()
	//获取地址栏参数
	var type = _util.getParamsFromUrl('type') || 'default';
	if(type == 'payment'){
		var orderNo = _util.getParamsFromUrl('orderNo') || '';
		var orderDetail = $('.order-detail').attr('href')
		$('.order-detail').attr('href',orderDetail+orderNo)
	}
	$('.'+type).show();
})

