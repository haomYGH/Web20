/*
* @Author: Administrator
* @Date:   2020-07-03 15:07:49
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 15:18:07
*/
//触发，传参

const EventEmitener = require('events');

class MyEvent extends EventEmitener{};

const myevent = new MyEvent();

//注意点:这里的参数没有ev对象。。。。。。。。。。。。。。。。
myevent.on('test',(agu1,agu2)=>{
	console.log(agu1,agu2);
})
// myevent.emit('test','tom','haom');
const arr = [11,22];
myevent.emit('test',...arr);