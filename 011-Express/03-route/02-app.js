/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 10:57:48
*/
const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('无论发送什么请求都会走到这里，如果想继续匹配需要调用next()方法');//在终端服务器下打印
	next();
})

app.get('/', (req,res,next) =>{
	console.log('get请求中...');
	next();
},(req,res) =>{
	res.send('get over ...')
});
app.post('/', (req, res) => res.send('response post ...'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))