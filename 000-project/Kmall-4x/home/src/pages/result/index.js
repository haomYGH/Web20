require('@pages/common/logo')
require('@pages/common/footer')
require('./style.css')

var _util = require('@util')
//$()作用域:不影响外面的变量.在讲jquery核心函数讲过
$(function(){
    // _util.getParamsFromUrl('type');
	var type = _util.getParamsFromUrl('type') || 'default';
	if(type == 'payment'){
		var orderNo = _util.getParamsFromUrl('orderNo')
		var $elem = $('.btn-order-detail');
		var href = $elem.attr('href') + orderNo;
		$elem.attr('href',href)
	}
	$('.'+type).show()
})