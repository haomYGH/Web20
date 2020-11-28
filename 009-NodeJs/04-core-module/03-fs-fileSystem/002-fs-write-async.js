/*
* @Author: Administrator
* @Date:   2020-07-04 10:37:10
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-06 17:49:27
*/
//async异步
const fs = require('fs');
const util = require('util');

/*
//逐步
	//1.打开文件
	fs.open('./test.txt','a',(err,fd)=>{
		if(err){
			console.log('File opening failed');
			console.log(err)
		}else{
			//2.写入
			fs.write(fd,'world',()=>{
				if(err){
					console('File write failed')
					console.log(err)
				}
				//不过写入失败还是成功都得关闭文件,释放内存
				//3.保存关闭
				fs.close(fd,(err)=>{
					if(err){
						console.log('File save failed');
						console.log(err)
					}else{
						console.log('File saved successfully!')
					}
				})
			})
		}
	})
*/
/*
//合并写法
// fs.writeFile(file, data[, options], callback)
fs.writeFile('./test.txt','hehe',(err)=>{
	if(err){
		console.log('File write Failed')
	}else{
		console.log('File successfully!')
	}
})
*/

//异步操作同步化(promise)
const writefile = util.promisify(fs.writeFile);
writefile('002.txt','nodejs')
.then(()=>{
	console.log('write file success');
})
.catch(err=>{
	console.log('write file err');
	console.log(err)
})