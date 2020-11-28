/*
* @Author: Chen
* @Date:   2020-08-10 16:30:19
* @Last Modified by:   haom
* @Last Modified time: 2020-08-31 20:48:09
*/
import Hogan from 'hogan.js';
module.exports = {
	validate:function(value,type){
		//非空验证
		if(type == 'required'){
			return !!value
		}
		//用户名验证
		else if(type == 'username'){
			return /^[a-z][a-z0-9_]{2,5}$/.test(value)
		}
		//密码验证
		else if(type == 'password'){
			return /^\w{3,6}$/.test(value)
		}
		//手机号验证
		else if(type == 'phone'){
			return /^1[35678]\d{9}$/.test(value)
		}
		//邮箱验证
		else if(type == 'email'){
			return /^\w+@\w+\.\w{2,6}$/.test(value)
		}
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	showErrMsg:function(msg){
		alert(msg)
	},
	showConfirmMsg:function(msg){
		return window.confirm(msg)
	},
	goLogin:function(){
		window.location.href = '/user-login.html?redirect='+window.location.href;
	},
	goResult:function(type){
		window.location.href = '/result.html?type='+type;
	},
	getParamsFromUrl:function(keyword){
		//获取地址栏参数信息
		var query = window.location.search.substr(1)
		//type=register
		//type=register&name=tom
		//name=tom&type=register
		//name=tom&type=register&age=18
		var reg = new RegExp('(^|&)'+keyword+'='+'([^&]*)($|&)');
		var result = query.match(reg);
		return result ? decodeURIComponent(result[2]) : null
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl)
		var html = template.render(data);
		return html
	}
}