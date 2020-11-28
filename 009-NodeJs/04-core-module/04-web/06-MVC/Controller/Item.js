/*
* @Author: Administrator
* @Date:   2020-07-07 11:59:02
* @Last Modified by:   haom
* @Last Modified time: 2020-07-08 19:31:40
*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const swig  = require('swig');
const querystring = require('querystring')
const mime = require('../mime.json');

const { get:getItem,add:addItem,del:delItem } = require('../Model/item.js');

class Controller{
	index(req,res,...args){
		//获取首页数据并返回
		getItem()
		.then(data=>{
			const fileName = path.normalize(__dirname+'/../View/index.html');
			const template = swig.compileFile(fileName);
			const html = template({
				data:data
			})
			res.end(html);
		})
		.catch(err=>{
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/html;charset=utf-8');
			res.end('<h1>请求的地址出错啦!</h1>')			
		})
	}
	add(req,res,...args){
		//1.定义变量用来存数据
		let body = '';
		//2.监听data事件
		req.on('data',(chunk)=>{
			body += chunk;
		})
		//3.监听end事件,数据读取完毕
		req.on('end',()=>{
			// 将body参数转化为对象
			const query = querystring.parse(body);
			// console.log(query)
			//将任务添加到后台数据中
			addItem(query.task)
			.then(data=>{
				res.end(JSON.stringify({
					code:0,
					message:'添加任务成功',
					data:data
				}))
			})
			.catch(err=>{
				res.end(JSON.stringify({
					code:1,
					message:'添加任务失败'
				}))
			})			
		})		
	}
	del(req,res,...args){
		//1.获取参数信息(get请求方式,可以通过地址栏urlParse中的query来拿到id)
		const reqPath = req.url;
		// console.log(reqPath);
		const urlParse = url.parse(reqPath,true);
		const id = urlParse.query.id;
		//2.根据参数中的id，删除后台对应数据
		delItem(id)
		.then(data=>{
			//3.返回删除信息
			res.end(JSON.stringify({
				code:0,
				message:'删除任务成功',
			}))
		})
		.catch(err=>{
			res.end(JSON.stringify({
				code:1,
				message:'删除失败'
			}))
		})		
	}
}

module.exports = new Controller();