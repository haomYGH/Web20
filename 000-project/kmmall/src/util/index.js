//浏览器端状态管理
export const saveUsername = (username)=>{
	return window.localStorage.setItem('username',username)
}
export const getUsername = ()=>{
	return window.localStorage.getItem('username');
}
export const removeUsername = ()=>{
	return window.localStorage.removeItem('username');
}
//数据验证
export const validate = (value,type) => {
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
	else if(type == 'tel'){
		return /^1[35678]\d{9}$/.test(value)
	}
	//邮箱验证
	else if(type == 'email'){
		return /^\w+@\w+\.\w{2,6}$/.test(value)
	}
	else if(type == 'captchaCode'){
		return /^\w{4}$/.test(value)
	}
}