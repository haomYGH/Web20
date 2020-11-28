//结果 导出一个对象:对象的属性就是方法名,值就是对应的方法
import { API_CONFIG } from './config.js'
import axios from 'axios'
import { removeUsername } from '@util'

const getApiConfig = (API_CONFIG)=>{
	const apiObj = {};
	for(let key in API_CONFIG){
		apiObj[key] = (data)=>{
			let url = API_CONFIG[key][0] || '/';
			let method = API_CONFIG[key][1] || 'get';
			//发送请求到后台
			return request(url,method,data)
		}
	}

	return apiObj;
}
const request = (url,method,data)=>{
	return new Promise((resolve,reject)=>{
		const options = {
			method:method,
			url:url,
			// withCredentials:true
		}
		//携带参数
		switch(method.toUpperCase()){
			case 'GET':
			case 'DELETE':
				options.params = data;
				break
			default :
				options.data = data;
		}
		axios(options)
		.then(result=>{
			// console.log('@util',result);
			const data = result.data;
			if(data.code == 1){//未登录，没有权限
				// 移除前端的用户状态
				removeUsername();
				//跳转到登录页面
				window.location.href = '/#/login'
				reject('未登录，没有权限')
			}else{
				resolve(result.data);
			}
		})
		.catch(err=>{
			reject(err)
		})
	})
}

//getApiConfig(API_CONFIG)返回一个对象，等于导出了一个对象

export default getApiConfig(API_CONFIG)