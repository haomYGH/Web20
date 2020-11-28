/*
* @Author: Administrator
* @Date:   2020-07-06 12:00:12
* @Last Modified by:   haom
* @Last Modified time: 2020-07-07 00:51:30
*/
// 操作item.json数据
const fs = require('fs');
const path=require('path');
const util=require('util');

const fliePath = path.normalize(__dirname+'/../data/item.json');

//异步操作
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

//读取文件
async function get(){
	const data = await readFile(fliePath,{flag:'r',encoding:'utf-8'});
	const aData = JSON.parse(data);
	return aData;
}
//添加数据
//思路：给数组添加数据方法
async function add(task){
	//1.读取数据
	const data = await readFile(fliePath,{flag:'r',encoding:'utf-8'})
	//2.将字符串数据转化成数组
	const arr = JSON.parse(data);
	//3.生成任务对象并添加到数组中
	const obj = {
		id:Date.now().toString(),
		task:task
	}
	arr.push(obj);
	//4.将最新的数据覆盖写入到文件中
	await writeFile(fliePath,JSON.stringify(arr));
	//5.返回任务对象
	return obj;
}
//删除数据
//思路，也是先获取所有然后删除，再将新数据覆盖原来的数据
async function del(id){
	//1.读取数据
	const data = await readFile(fliePath,{flag:'r',encoding:'utf-8'});
	//2.将数据转化成数组
	const aData = JSON.parse(data);
	//3.根据id筛选出数组中的数据
	const newADate = aData.filter(item=>{
		// console.log(item.id);
		return item.id != id;
	});//箭头函数参数item表示aData数据中的每一项
	//4.将更新的数据覆盖写入到后台数据中
	await writeFile(fliePath,JSON.stringify(newADate));
}



module.exports = {
	get,
	add,
	del,
}