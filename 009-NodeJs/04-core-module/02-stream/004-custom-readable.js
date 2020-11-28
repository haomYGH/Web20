/*
* @Author: haom
* @Date:   2020-07-04 01:33:04
* @Last Modified by:   haom
* @Last Modified time: 2020-07-04 01:38:49
*/
const { Readable } = require('stream');
// console.log(Readable);

/*
const reader = new Readable();//The _read() method is not implemented
reader.read();
*/

class CustomReadable extends Readable{
	constructor(){
		super();
		this.index = 0;
	}
	_read(){
		this.index ++;
		if(this.index < 5){
			this.push(this.index+'');
		}else{
			this.push(null);
		}
	}
}


const reader = new CustomReadable();
//读取数据流程
/*
	//1.定义变量用来存数据
	let body = '';
	//2.监听data事件
	reader.on('data',(chunk)=>{
		// console.log(chunk);
		body += chunk;
	})
	//3.监听end事件,数据读取完毕
	reader.on('end',()=>{
		console.log('read data end');
		console.log(body);
	})
*/

//readable.pipe(writable) 将可读流的数据传递给可写流
reader.pipe(process.stdout);