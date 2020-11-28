/*
* @Author: Administrator
* @Date:   2020-07-03 11:12:54
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-03 11:56:17
*/
//字符转16进制数
const buf1 = Buffer.from('f');
console.log(buf1);
//16进制数转字符
const bufStr = Buffer.alloc(1);
console.log(bufStr);
bufStr[0]=0x66;//0x表示16进制数
console.log(bufStr);//??