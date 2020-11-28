/*
* @Author: Administrator
* @Date:   2020-07-03 16:35:02
* @Last Modified by:   haom
* @Last Modified time: 2020-07-04 01:43:51
*/
////process.stdout 代表控制台的可写流
process.stdout.write('hh');

//控制台可读流
//process.stdin 代表控制台的可读流
process.stdin.on('data',(chunk)=>{
	console.log(chunk);
});
//f
//<Buffer 66 0d 0a>
//66表示f的16进制数
//0d表示回车键;(十进制13转16进制是D)
//0a表示换行
