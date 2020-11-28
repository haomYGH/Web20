;(function($){
    //前台修改密码验证
	var $formPassword = $('.form-password');
	$('#btn-sub-password').on('click',function(){
		//1.获取输入框数据
		var password = $formPassword.find('[name="password"]').val();
		var repassword = $formPassword.find('[name="repassword"]').val();
		//密码是3-6位任意字符
		var passwordReg = /^\w{3,6}$/i;

		//2.验证数据合法性
		if(!passwordReg.test(password)){
			$('.err').eq(0).html('密码是3-6位任意字符')
			return false
		}else{
			$('.err').eq(0).html('')
		}
		if(password != repassword){
			$('.err').eq(1).html('两次密码输入不一致');
			return false
		}else{
			$('.err').eq(1).html('')
		}
	})
})(jQuery);