//引入UI
import { message } from 'antd';
//引入axios请求
import axios from 'axios'
//引入action_type
import * as types from './actionTypes'
//引入请求地址
import { ADMIN_LOGIN } from '@api'

import { request,setUserName } from '@util'

//因为派发action可能需要传递参数，所有不能直接导出一个对象，可以导出一个函数,返回值是对象
const getLoginRequestAction = ()=>{
	return {
		type:types.LOGIN_REQUEST
	}
}
const getLoginDoneAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
}
export const getLoginAction = (values)=>{
	return (dispatch)=>{
		//1.让登录按钮处于加载状态
		//1.1 其实就是需要改变state.login.isFetching 为 true
		//1.2 方法就是派发action
		//1.3 dispatch把action派发到store
		//1.4 store再把action转交个reducer
		//1.5 相当于程序流程走到./reducer.js
		dispatch(getLoginRequestAction());//开始请求，登陆状态开始转圈
		values.role = 'admin';
		request({
			method:'post',
			url:ADMIN_LOGIN,
			data:values
		})
		.then(result=>{
			if(result.code == 0){//登录成功
				//把用户名保存到本地
				setUserName(result.data.username)
				//跳转到后台首页
				window.location.href = "/"
			}else if(result.code == 1){
				message.error(result.message)
			}                       
		})
		.catch(err=>{
			console.log(err);
			message.error('网络请求失败,请稍后再试')
		})
		.finally(()=>{
			//2.让登录按钮处于活动状态
			dispatch(getLoginDoneAction())
		})                   		
	}
}