/*
* @Author: Administrator
* @Date:   2020-07-03 17:15:48
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-06 17:13:13
*/
const {Writable} = require('stream');

// class customWriteIn extends Writable{};
class customWriteIn extends Writable{
	//_write(chunk, encoding, callback)
	_write(chunk,encoding,callback){
		console.log('chunk::',chunk);
		console.log('encoding::',encoding);
		callback();
	}
}

const writeIn = new customWriteIn();

writeIn.write('aa');//The _write() method is not implemented
writeIn.write('hello',function(){
	console.log('hello world !')
})
/*
writeIn.write('hello !','buffer',function(){
	console.log('hello world !')
});//encoding <string> 如果 chunk 是字符串，则指定字符编码。 如果 chunk 是 Buffer 或者流处于对象模式，则无视该选项。
*/
//？为什么原型上带下划线，用的时候没用下划线
//因为他两个就不是一个函数
// console.log(writeIn._write+'');
/*
// console.log(writeIn.write+'');
function(chunk, encoding, cb) {
  const state = this._writableState;
  var ret = false;
  const isBuf = !state.objectMode && Stream._isUint8Array(chunk);

  // Do not use Object.getPrototypeOf as it is slower since V8 7.3.
  if (isBuf && !(chunk instanceof Buffer)) {
    chunk = Stream._uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf)
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (typeof cb !== 'function')
    cb = nop;

  if (state.ending)
    writeAfterEnd(this, cb);
  else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
}
//_write中的参数是从write中的参数转换过去的
*/