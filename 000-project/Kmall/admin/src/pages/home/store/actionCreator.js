/*
* @Author: Chen
* @Date:   2020-07-28 10:35:29
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-03 15:43:41
*/
import axios from 'axios'
import { message } from 'antd'
import apiObj from 'api/index.js'

import {
	SET_COUNTS
} from './actionTypes.js'


export const setCountsAction = (data)=>({
	type:SET_COUNTS,
	payload:data
})

export const getCountsAction = ()=>{
	return (dispatch,getState)=>{
		apiObj.getCounts()
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){//登录成功
				//派发action将数据存到store中
				dispatch(setCountsAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		/*
		axios({
			method: 'get',
			url: 'http://127.0.0.1:3000/counts',
			withCredentials:true
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){//登录成功
				//派发action将数据存到store中
				dispatch(setCountsAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		*/

	}
}