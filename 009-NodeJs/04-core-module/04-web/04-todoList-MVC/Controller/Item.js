/*
* @Author: Administrator
* @Date:   2020-07-07 11:59:02
* @Last Modified by:   haom
* @Last Modified time: 2020-07-08 11:09:04
*/
class Controller{
	index(req,res,...args){
		// console.log('argsxxx',args);
		res.end('ok')
	}
}

module.exports = new Controller();