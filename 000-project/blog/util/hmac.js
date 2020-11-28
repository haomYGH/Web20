/*
* @Author: haom
* @Date:   2020-07-15 16:33:40
* @Last Modified by:   haom
* @Last Modified time: 2020-07-15 16:41:45
*/
//将加密模块改造成一个方法(方法就是工具)
const crypto = require('crypto');

module.exports = (str)=>{
	const hmac = crypto.createHmac('sha512', 'ygh');
	//加密明文
	hmac.update(str);
	//生成密文并返回
	return hmac.digest('hex');
}
//经典啊