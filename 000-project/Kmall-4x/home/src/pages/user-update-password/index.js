require('./style.css')
require('@pages/common/nav')
require('@pages/common/search')
var _side = require('@pages/common/side')
require('@pages/common/footer')
var _util = require('@util')
var _user = require('@service/user')

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
        //侧边栏选中状态
        this.renderSide();
        //绑定事件
		this.bindEvent();
    },
    renderSide:function(){
		_side.render('user-update-password')
    },
    bindEvent:function(){
        var _this = this;
		$('#btn-submit').on('click',function(){
			_this.submit();
		})
		//监听键盘事件提交表单
		$('.side-content input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
    },
    submit:function(){
        //1.获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
        };
        //2.验证数据合法性
        var validateResult = this.validate(formData);
        if(validateResult.status){//验证通过
            //隐藏错误提示
            formDataMsg.hide()
            //3).验证通过发送ajax请求
            _user.updatePassword(
                formData,
                function(){
                    //修改成功回到结果提示页
                    _util.goResult('updatePassword')
            },
                function(msg){
                    formDataMsg.show(msg);
            })
        }else{//验证不通过
            formDataMsg.show(validateResult.msg);
        }
    },
    validate:function(formData){
        var result = {
			status:false,
			msg:''
		}
		//密码非空验证
		if(!_util.validate(formData.password,'require')){
			result.msg = '请输入密码'
			return result
		}
		//密码合法性验证
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码是3-6位任意字符'
			return result
		}
		//验证两次密码一致
		if(formData.password != formData.repassword){
			result.msg = '两次密码输入不一致'
			return result
		}
		result.status = true;
		return result;
    }
}
$(function(){
    page.init();
})