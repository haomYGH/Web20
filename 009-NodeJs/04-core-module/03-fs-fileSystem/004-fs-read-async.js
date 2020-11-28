/*
* @Author: Administrator
* @Date:   2020-07-04 11:48:35
* @Last Modified by:   haom
* @Last Modified time: 2020-07-06 22:37:48
*/
const fs = require('fs')
const util = require('util')

/*
//逐步
	//1.打开
	fs.open('./test.txt','r',(err,fd)=>{
		if(err){
			console.log(err)
		}else{
			//2.读取
			const buf = Buffer.alloc(100);
			fs.read(fd,{buffer:buf,offset:0,length:50,position:0},(err)=>{
				if(err){
					console.log(err)
				}else{
					console.log(buf)
				}
				//3.关闭
				fs.close(fd,(err)=>{
					if(err){
						console.log(err)
					}else{
						console.log('successfully')
					}
				})
			})
		}
	})
*/
/*
//合并
// fs.readFile(path[, options], callback)
fs.readFile('./test.txt',(err,fd)=>{
	if(err){
		console.log(err)
	}else{
		console.log('successfully');
		console.log(fd);//<Buffer 68 65 68 65>
		console.log(fd.toString())
	}
})
*/

//异步操作同步化(promise)
const readFile = util.promisify(fs.readFile);
readFile('./test.txt')
.then((data)=>{
	console.log(data.toString())
	console.log('read file success');
})
.catch(err=>{
	console.log('read file err');
	console.log(err)
})
/*
console.log(readFile+'');
//输出如下
function fn(...args) {
    return new Promise((resolve, reject) => {
      original.call(this, ...args, (err, ...values) => {
        if (err) {
          return reject(err);
        }
        if (argumentNames !== undefined && values.length > 1) {
          const obj = {};
          for (let i = 0; i < argumentNames.length; i++)
            obj[argumentNames[i]] = values[i];
          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
    });
  }
*/