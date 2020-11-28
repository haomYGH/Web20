/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 11:34:01
*/
const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static('public'))

app.get('/', (req,res) =>{
	// /?name=tom&age=18
	console.log(req.query)
});
//获取第2种参数前要加冒号：
app.get('/name/:param1/age/:param2',(req,res) =>{
	// /?name=tom&age=18
	console.log(req.params)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))