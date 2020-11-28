/*
* @Author: haom
* @Date:   2020-07-08 19:54:57
* @Last Modified by:   haom
* @Last Modified time: 2020-07-08 19:55:03
*/
const crypto = require('crypto');

const hmac = crypto.createHmac('sha512', 'sdasdsadasdasdas');

// 123456 =>明文
console.log('123456')


hmac.update('123456');

console.log(hmac.digest('hex'));