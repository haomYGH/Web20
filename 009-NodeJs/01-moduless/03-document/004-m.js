//nodeJs模块化
const str = 'hello';
const obj = {
	name:'haom'
}
const fn = ()=>{
	console.log('fn ...')
}

/*
exports.str = str;
exports.obj = obj;
exports.fn = fn;
*/
module.exports = {
	str,
	obj,
	fn
}