/*
* @Author: Administrator
* @Date:   2020-07-13 14:25:59
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 14:30:19
*/
const express = require('express')
const route = express.Router();


route.get('/', (req,res) =>{
	res.send('get response...')
});
route.post('/', (req,res) =>{
	res.send('get response...')
});

module.exports = route