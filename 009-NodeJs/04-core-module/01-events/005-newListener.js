/*
* @Author: Administrator
* @Date:   2020-07-03 15:53:05
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 15:57:52
*/
//'newListener'事件,当有新的监听被添加时触发,回调函数接受两个参数分别是添加的事件名称和函数

const EventEmitener = require('events');

class MyEvent extends EventEmitener{};

const myevent = new MyEvent();

myevent.on('newListener',(eventName,callback)=>{
	console.log('newListener ...');
	console.log(eventName);
	callback();//就是个函数,不用做容错处理。执行新添加的事件
})

myevent.on('show',()=>{
	console.log('show ing ...')
})