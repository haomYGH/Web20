/*
* @Author: Administrator
* @Date:   2020-07-03 15:31:24
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 15:36:52
*/
//移除事件

const EventEmitener = require('events');

class MyEvent extends EventEmitener{};

const myevent = new MyEvent();

let fn1 = ()=>{
	console.log('fn1 show ..')
}
let fn2 = ()=>{
	console.log('fn2 show ..')
}
myevent.on('show',fn1);
myevent.on('show',fn2);

// myevent.removeListener('show',fn1);
myevent.off('show',fn1);
//注意点：1.参数不能为空。2.移除事件名，移除函数(有名函数);

myevent.emit('show');