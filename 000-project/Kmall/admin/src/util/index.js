/*
* @Author: Chen
* @Date:   2020-08-01 15:10:09
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-01 15:12:37
*/
export const saveUsername = (username)=>{
	return window.localStorage.setItem('username',username)
}
export const getUsername = ()=>{
	return window.localStorage.getItem('username');
}
export const removeUsername = ()=>{
	return window.localStorage.removeItem('username');
}