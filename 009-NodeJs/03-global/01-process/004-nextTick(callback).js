/*
* @Author: Administrator
* @Date:   2020-07-03 09:30:50
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 10:47:50
*/
//process.nextTick(callback) 方法将 callback 添加到下一个时间点的队列。
// 一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。


// 比立即定时器要快
setImmediate(function(){
	console.log('timer Immediate ...')
})
process.nextTick(function(){
	console.log('nextTice ...')
})

//同步程序
console.log('heheh..')