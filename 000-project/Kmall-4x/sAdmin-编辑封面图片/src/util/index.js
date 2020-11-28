import axios from 'axios';

export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}
export const getUserName = ()=>{
	return window.localStorage.getItem('username');//这个跟cookie有什么关系
}
export const removeUserName = ()=>{
	window.localStorage.removeItem('username')
}

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
        	method:options.method || 'get',	
			url:options.url || '',
			withCredentials: true,//携带前台cookie传到后台:目的是前后台状态一致
		}
		//处理data参数
		switch(params.method.toUpperCase()){
			case 'GET':
			case 'DELETE':
				params.params = options.data
				break
			default:
				params.data = options.data

		}
		axios(params)
		.then(result=>{
			const data = result.data;
			if(data.code == 10){//没有权限
				//移除前端的登录信息(后台移除前台用户状态)
				removeUserName();
				//跳转到登录页面
				window.location.href = '/login'
				reject('没有权限')
			}else{
				resolve(data);
			}
		})
		.catch(err=>{
			reject(err)
		})
	})
}