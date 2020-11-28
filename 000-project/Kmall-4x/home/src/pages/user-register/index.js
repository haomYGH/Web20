require('./style.css')
require('@pages/common/logo')
require('@pages/common/footer')

var _util = require('@util')
var _user = require('@service/user')
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
        this.bindEvent();//绑定事件
    },
    bindEvent:function(){
        var _this = this;
        //1.失去焦点验证用户名是否存在
        $('[name="username"]').on('blur',function(){
			var username = $(this).val();
			if(!_util.validate(username,'require')){
				return;
			}
			if(!_util.validate(username,'username')){
				return;
			}
			_user.checkUsername(username,function(){
				formErr.hide()
			},function(msg){
				formErr.show(msg)
			})
		})
        //2.用户注册
        $('#btn-submit').on('click',function(){
            _this.submitRegister()
        })
        //监听所有输入框,当回车键按下抬起来时时
        $('input').on('keyup',function(ev){
            if(ev.keyCode === 13){
                _this.submitRegister()
            }
        })
    },
    submitRegister:function(){
        //1).获取数据
        // var name = $('[name="username"]').val();//$.trim去掉两边空格
        var formData = {
            username:$('[name="username"]').val(),
            password:$('[name="password"]').val(),
            repassword:$('[name="repassword"]').val(),
            phone:$('[name="phone"]').val(),
            email:$('[name="email"]').val(),
        }
        // console.log(formData);
        //2).验证数据
        var validateResult = this.validate(formData);
        if(validateResult.status){//验证通过
            //隐藏错误提示
            formErr.hide()
            //3).验证通过发送ajax请求
            _user.register(
                formData,
                function(){
                    //注册成功回到成功提示页
                    // window.location.href = '/result.html?type=register'
                    _util.goResult('register')
            },
                function(){
                    formErr.show(validateResult.msg);
            })
        }else{//验证不通过
            formErr.show(validateResult.msg);
        }
    },
    validate:function(formData){
        var result = {
			status:false,
			msg:''
        }
        //用户名非空验证
        if(!_util.validate(formData.username,'require')){
            result.msg = '用户名不能为空！！';
            return result;
        }
        //用户名格式验证
        if(!_util.validate(formData.username,'username')){
            result.msg = '用户名是3到6位的字母数字下划线！！';
            return result;
        }
        //密码非空
        if(!_util.validate(formData.password,'require')){
            result.msg = '密码不能为空！！';
            return result;
        }
        //密码格式验证
        if(!_util.validate(formData.password,'password')){
            result.msg = '密码3到6位任意字符!!';
            return result;
        }
        //两次密码不一致
        if(formData.password != formData.repassword){
            result.msg = '两次密码不一致!!';
            return result;
        }
        //手机号非空验证
		if(!_util.validate(formData.phone,'require')){
			result.msg = '请输入手机号'
			return result
		}
		//手机号合法性验证
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确'
			return result
		}
		//邮箱非空验证
		if(!_util.validate(formData.email,'require')){
			result.msg = '请输入邮箱'
			return result
		}
		//邮箱合法性验证
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确'
			return result
        }
        //如果以上都通过则验证成功
        result.status = true;
		return result;
    }
}

$(function(){
    page.init()
})