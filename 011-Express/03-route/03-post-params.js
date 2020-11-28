/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-14 16:36:11
*/
const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');

app.use('/static', express.static('public'))

//中间件
app.use(bodyParser.json());
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/', (req,res) =>{
	//中间件获取post参数
	console.log(req.body);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))