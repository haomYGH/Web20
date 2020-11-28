/*
* @Author: haom
* @Date:   2020-07-08 17:22:51
* @Last Modified by:   haom
* @Last Modified time: 2020-07-08 17:25:58
*/
class Controller{
	index(req,res,...args){
		res.setHeader('Content-Type', 'text/html;charset=utf-8');
		res.end('<a href="Item/index">Item/index.html</a>')	
	}
}

module.exports = new Controller();
