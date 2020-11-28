/*
* @Author: Administrator
* @Date:   2020-07-03 11:20:46
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 11:45:17
*/
const EventEmitter = require('events');
//通常我们需要继承EventEmitter类来实现事件
class MyEvent extends EventEmitter{};

// 实例化
const myEvent = new MyEvent();

//监听事件(绑定事件bind)
myEvent.on('test',function(){
	console.log('haha')
})

//触发事件
myEvent.emit('test');