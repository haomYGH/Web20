/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 15:31:42
*/
const express = require('express')
const app = express()
const port = 3000;


app.use('/static', express.static('public'))

app.use('/',(req,res,next)=>{
	console.log('中间件。。。')
	next();
})

app.get('/', (req,res) =>{
	res.send('get response...')
});
app.post('/', (req,res) =>{
	res.send('post response...')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))