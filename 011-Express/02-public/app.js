/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 09:33:31
*/
const express = require('express')
const app = express()
const port = 3000

//处理静态资源
//方法1
app.use(express.static('public'))//前台发送根/请求，先找静态资源下面的index.html，有的话就不向下匹配
//方法2(推荐)
app.use('/static', express.static('public'))//设置虚拟地址，前台需要请求/static才能去请求静态资源

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))