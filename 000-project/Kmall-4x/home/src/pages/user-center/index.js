require('@pages/common/nav')
require('@pages/common/logo')
require('@pages/common/search')
var _side = require('@pages/common/side')
require('@pages/common/footer')
require('./style.css')
var tpl = require('./user-info.tpl')
var _user = require('@service/user')
var _util = require('@util')

var page = {
	init:function(){
		//侧边栏选中状态
		this.renderSide()
		//获取登录用户信息
		this.loadUserInfo()
	},
	renderSide:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		/*
		_user.getUserInfo(
			function(user){
				var html = _util.render(tpl,user)
				$('.side-content').html(html)
			}
		)
		*/
		_user.getUserInfo(function(user){
			// console.log(user)
			/*
			var html = _util.render(tpl,{
				user:user
			});*/
			//精简写法，.tpl文件里面不用{{#user}}
			var html = _util.render(tpl,user);//这样.tpl模板就不用像side.tpl模板那样使用{{#user}}
			$('.side-content').html(html)
		})
	}
}

$(function(){
	page.init();
})

