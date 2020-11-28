/*
* @Author: Administrator
* @Date:   2020-07-03 11:45:29
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 11:52:15
*/
//监听事件的3种方法
//addListener
//on
//once
//其中addListener等于on

const EventEmitter = require('events');
//通常我们需要继承EventEmitter类来实现事件
class MyEvent extends EventEmitter{};

// 实例化
const myEvent = new MyEvent();

//监听事件
myEvent.addListener('test',function(){
	console.log('addListener ...')
})
myEvent.on('test',function(){
	console.log('on ...')
})
myEvent.once('test',function(){
	console.log('once ...')
})

//触发
myEvent.emit('test');
myEvent.emit('test');//没有once事件


//证明addListener 等于 on
console.log(myEvent.addListener == myEvent.on);//true