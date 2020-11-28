class MUtill {
	// 1.发送AJAX请求
	request (param) {
		return new Promise((resolve, reject) => {
			$.ajax({
				type		: param.type 		|| 'get',
				url			: param.url  		|| '',
				dataType	: param.dataType 	|| 'json',
				data 		: param.data 		|| '',
				success 	: res => {
					// 登陆成功
					if (0 === res.status) {
						typeof resolve === 'function' && resolve(res.data, res.msg)
					}
					// 没有登陆状态，强制跳转到登陆页面(需要接口提供这个字段)
					else if (10 === res.status) {
						this.logout()
					}
					// 登陆失败，接口请求成功但是用户名或者密码错误
					else {
						typeof reject === 'function' && reject(res.msg, res.data)
					}
				},
				// 这里是接口请求错误
				error 		: err => {					
					// statusText是http请求错误对象err里面的东西
					typeof reject === 'function' && reject(err.statusText)
				}
			})
		})			
	}

	// 2.跳转到登陆页面
	logout () {
		// redirect表示从哪里跳转过来的,pathname里面可能有特殊字符，encodeURIComponent可以做转译成安全字符
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
	}

	// 3.获取请求参数
	getUrlParam (name) {
		// /login?redirect=Tom&age=20
		let queryString 	= window.location.search.split('?')[1] || '',
			reg 			= new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
			result 			= queryString.match(reg);
		// result = ['redirect=Tom', '', 'Tom', '&']
		// 第一个参数：整体匹配，第二个：匹配第一个括号里面的，第三个：匹配name，第四个：匹配第二个括号里面的
		return result ? decodeURIComponent(result[2]) : null
	}

	// 4.错误提示
	errorTips (errMsg) {
		alert(errMsg || '好像哪里不对了！！！')
	}

	// 5.成功提示
	successTips (successMsg) {
		alert(successMsg || '操作成功')
	}

	// 6.设置本地存储
	setStorage (name, data) {
		let dataType = typeof data;
		// JSON类型
		if (dataType === 'object') {
			return window.localStorage.setItem(name, JSON.stringify(data))
		}
		// 基本类型
		else if (['string', 'number', 'boolean'].indexOf(dataType) >= 0) {
			return window.localStorage.setItem(name, data)
		}
		// 其他类型	
		else {
			alert('该类型不能用于本地存储')
		}
	}

	// 7.获取本地存储
	getStorage (name) {
		if (name) {
			return JSON.parse(window.localStorage.getItem(name))
		}
		else {
			return ''
		}
	}

	// 8.删除本地存储
	removeStorage (name) {
		window.localStorage.removeItem(name)
	}
}

export default MUtill;
