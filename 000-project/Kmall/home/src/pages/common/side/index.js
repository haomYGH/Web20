/*
* @Author: Chen
* @Date:   2020-08-10 11:27:30
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-13 10:32:52
*/
require('./index.css');

// import Hogan from 'hogan.js';
var tpl = require('./index.tpl');
var _util = require('util')

module.exports = {
	render:function(name){
		var list = [
			{
				name:'user-center',
				link:'./user-center.html',
				desc:'用户中心'
			},
			{
				name:'order-list',
				link:'./order-list.html',
				desc:'我的订单'
			},
			{
				name:'user-update-password',
				link:'./user-update-password.html',
				desc:'修改密码'
			},
		]
		list.find(function(item){
			return item.name == name
		}).isActive= true
		/*
		var template = Hogan.compile(tpl)
		var html = template.render({
			list:list
		});
		*/
		var html = _util.render(tpl,{
			list:list
		})
		$('.side').html(html)
	}
}

