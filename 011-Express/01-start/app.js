/*
* @Author: Administrator
* @Date:   2020-07-11 17:42:21
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-11 17:42:23
*/

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))