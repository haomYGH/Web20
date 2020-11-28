/*
* @Author: Chen
* @Date:   2020-07-28 10:35:29
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-03 15:39:33
*/
import axios from 'axios'
import { saveUsername } from 'util/index.js';
import { message } from 'antd'
import apiObj from 'api/index.js'

import {
	LOGIN_START_ACTION,
	LOGIN_DONE_ACTION,
} from './actionTypes.js'


export const getLoginStartAction = ()=>({
	type:LOGIN_START_ACTION
})
export const getLoginDoneAction = ()=>({
	type:LOGIN_DONE_ACTION
})


export const getLoginAction = (data)=>{
	return (dispatch,getState)=>{
		//发送请求之前显示登录loading状态
		dispatch(getLoginStartAction())
		data.role = 'admin'
		//首先发送请求在生成action对象
		apiObj.login(data)
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){//登录成功
				//1.保存用户状态(保存在前台)
				saveUsername(data.data.username)
				//2.登录成功回到后台管理员首页
				window.location.href = '/'
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getLoginDoneAction())
		})

		/*
		axios({
			method: 'post',
			url: 'http://127.0.0.1:3000/sessions/users',
			data:data,
			withCredentials:true
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){//登录成功
				//1.保存用户状态(保存在前台)
				saveUsername(data.data.username)
				//2.登录成功回到后台管理员首页
				window.location.href = '/'
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		.finally(()=>{
			//无论请求成功或失败取消loading状态
			dispatch(getLoginDoneAction())
		})
		*/

	}
}