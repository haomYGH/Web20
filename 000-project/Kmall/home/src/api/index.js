/*
* @Author: Chen
* @Date:   2020-08-03 15:16:41
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-13 11:09:34
*/
//目标 导出一个对象:对象的属性就是方法名,值就是对应的方法
var { API_CONFIG } =  require('api/config.js')
var _util = require('util');

const getApiConfig = (API_CONFIG)=>{
	const apiObj = {};
	for(let key in API_CONFIG){
		apiObj[key] = (options)=>{
			let url = API_CONFIG[key][0] || '/';
			let method = API_CONFIG[key][1] || 'get';
			//发送请求到后台
			return request({
				url:url,
				method:method,
				data:options.data,
				success:options.success,
				error:options.error
			})
		}
	}

	return apiObj;
}
const request = (options)=>{
	return $.ajax({
		url:options.url,
		method:options.method,
		dataType:'json',
		data:options.data,
		success:function(data){
			if(data.code == 0){//成功
				options.success && options.success(data.data)
			}else if(data.code == 1){//失败
				options.error && options.error(data.message)
			}else if(data.code == 10){//未登录
				// window.location.href = '/user-login.html'
				_util.goLogin();
			}
		},
		error:function(err){
			options.error && options.error('网络错误,请稍后再试!!')
		}
	})
}



module.exports = getApiConfig(API_CONFIG)