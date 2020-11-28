/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 14:33:35
*/
const express = require('express')
const app = express()
const port = 3000;

const user = require('./module/user.js')

app.use('/static', express.static('public'))
/*
app.get('/user', (req,res) =>{
	res.send('get response...')
});
app.post('/user', (req,res) =>{
	res.send('get response...')
});
*/
app.use('/user',user)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))