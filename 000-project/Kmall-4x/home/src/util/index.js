var Hogan = require('hogan.js')
module.exports = {
    //$.ajax请求
    request:function(options){
		var _this = this;
		$.ajax({
			method:options.method || 'get',
			url:options.url || '',
			dataType:options.dataType || 'json',
			data:options.data || '',
			success:function(result){
				//成功
				if(result.code == 0){
					options.success && options.success(result.data)
				}
				//失败
				else if(result.code == 1){
					options.error && options.error(result.message)
				}
				//没有权限,未登录
				else if(result.code == 10){
					//跳转到登录页面
					_this.goLogin();
				}
			},
			error:function(err){
				options.error && options.error(err.statusText)
			}

		})
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	goResult:function(type){
		window.location.href = '/result.html?type='+type
	},
	goLogin:function(){
		window.location.href = './user-login.html?redirect='+window.location.href
	},
	goHome:function(){
		window.location.href = '/'
	},
	getParamsFromUrl:function(keyword){
		//获取地址栏参数信息
		var query = window.location.search.substr(1);//获取参数并去掉问号
		//type=register
		//type=register&name=tom
		//name=tom&type=register
		//name=tom&type=register&age=18
		var reg = new RegExp('(^|&)'+keyword+'='+'([^&]*)($|&)');//
		var result = query.match(reg);//搜索( type=   ),以type=或者&type=开头,
		//当地址栏参数是?name=tom&type=register。keywore传进来的是'type'时
		// console.log(result);//["&type=register", "&", "register", "", index: 8, input: "name=tom&type=register", groups: undefined]
		//decodeURIComponent()解码
		return result ? decodeURIComponent(result[2]) : null
	},
    //前台登录注册验证
    validate:function(value,type){
		
		var value = $.trim(value);
		//非空验证
		if(type == 'require'){
			return !!value;//如果value为空返回0
		}
		//用户名格式验证
		if(type == 'username'){
			return /^[a-zA-Z0-9_]{3,6}$/.test(value);//字母数字下划线，3到6位
		}
		//密码格式验证
		if(type == 'password'){
			return /^\w{3,6}$/.test(value);//密码3到6位任意字符
		}
		//手机号格式验证
		if(type == 'phone'){
			return /^1[3568]\d{9}$/.test(value);
		}
		//邮箱格式验证
		if(type == 'email'){
			return /^\w+@\w+\.\w{2,6}$/.test(value);
		}				
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl)
		var html = template.render(data);
		return html
	}
}