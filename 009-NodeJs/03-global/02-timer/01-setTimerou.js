/*
* @Author: Administrator
* @Date:   2020-07-03 09:58:50
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 15:43:27
*/
console.log(global.setTimeout === setTimeout);//true
//setTimeout()/clearTimeout();延迟定时器/清除延迟定时器
setTimeout(function(){
	console.log('timer out ...')
},1000)
