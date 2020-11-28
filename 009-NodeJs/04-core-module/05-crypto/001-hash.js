/*
* @Author: haom
* @Date:   2020-07-08 19:54:37
* @Last Modified by:   haom
* @Last Modified time: 2020-07-08 19:54:42
*/
const crypto = require('crypto');

// const hash = crypto.createHash('md5');
// const hash = crypto.createHash('sha256');
const hash = crypto.createHash('sha512');

// 123456 =>明文
console.log('123456')


hash.update('123456');

console.log(hash.digest('hex'))