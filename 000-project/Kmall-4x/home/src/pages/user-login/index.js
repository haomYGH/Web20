require('./style.css')
require('@pages/common/logo')
require('@pages/common/footer')
var _user = require('@service/user')
var _util = require('@util')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')		
	}
}
var page = {
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
		//1.用户登录
		$('#btn-submit').on('click',function(){
			_this.submitLogin();
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitLogin();
			}
		})
        //当触发提交事件时
        //1.获取数据
        //2.验证数据
        //3.发送请求
    },
    submitLogin:function(){
		//1).获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
        }
		//2).验证数据
		var validateResult = this.validate(formData)
		if(validateResult.status){//验证通过
			formErr.hide()
			//3).发送请求
			_user.login(formData,function(){
				// console.log(formData)
                window.location.href = _util.getParamsFromUrl('redirect') || "/"
                // window.location.href = '/'
			},function(msg){
				formErr.show(msg)
			})
		}
		else{//验证失败
			formErr.show(validateResult.msg)
        }
    },
    validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//用户名不能为空
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空'
			return result;
		}
		//用户名格式不正确
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确'
			return result;
		}
		//密码不能为空
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空'
			return result;
		}
		//密码格式不正确
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确'
			return result;
		}		
		result.status = true;
		return result;

	}
}
$(function(){
    page.init();
})