/*
* @Author: Chen
* @Date:   2020-08-08 15:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-13 10:41:38
*/
require('pages/common/logo')
require('pages/common/footer')
require('./index.css');

var _util = require('util');
var api = require('api');

var formDataMsg = {
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
		$('#btn-submit').on('click',function(){
			_this.submit();
		})
		//监听键盘事件提交表单
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
		}
		//2.验证数据合法性
		var validateFormData = this.validate(formData)
		//3.验证通过发送请求
		if(validateFormData.status){//验证通过
			//隐藏错误提示
			formDataMsg.hide();
			//发送ajax请求
			api.login({
				data:formData,
				success:function(data){
					window.location.href = _util.getParamsFromUrl('redirect') || '/'
				},
				error:function(msg){
					formDataMsg.show(msg);
				}
			})
			/*
			$.ajax({
				url:'/sessions/users',
				method:'post',
				dataType:'json',
				data:formData,
				success:function(data){
					// console.log(data)
					if(data.code == 0){
						window.location.href = '/'
					}else{
						formDataMsg.show(data.message);
					}
					
				},
				error:function(err){
					formDataMsg.show('网络错误,请稍后再试!!');
				}
			})
			*/
		}else{
			formDataMsg.show(validateFormData.msg);
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//用户名非空验证
		if(!_util.validate(formData.username,'required')){
			result.msg = '请输入用户名'
			return result
		}
		//用户名合法性验证
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名是以字母开始的3-6位字符'
			return result
		}
		//密码非空验证
		if(!_util.validate(formData.password,'required')){
			result.msg = '请输入密码'
			return result
		}
		//密码合法性验证
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码是3-6位任意字符'
			return result
		}
		result.status = true;
		return result;
	}
}

$(function(){
	page.init();
})

