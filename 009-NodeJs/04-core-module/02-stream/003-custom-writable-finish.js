/*
* @Author: haom
* @Date:   2020-07-04 01:18:18
* @Last Modified by:   haom
* @Last Modified time: 2020-07-04 01:19:21
*/
const { Writable } = require('stream');

class CustomWritable extends Writable{
	_write(chunk, encoding, callback){
		console.log("chunk::",chunk);
		console.log("encoding::",encoding);
		callback();
	}
}

const write = new CustomWritable();

write.on('finish',()=>{
	console.log('write stream finish ...');
});

write.write('hello');
write.write('world',()=>{
	console.log('after write world');
});

write.end('stream end');
/*
chunk:: <Buffer 68 65 6c 6c 6f>
encoding:: buffer
chunk:: <Buffer 77 6f 72 6c 64>
encoding:: buffer
chunk:: <Buffer 73 74 72 65 61 6d 20 65 6e 64>
encoding:: buffer
after write world
write stream finish ...
 */