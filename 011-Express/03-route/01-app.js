/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 12:42:01
*/
const express = require('express')
const app = express()
const port = 3000;

app.use('/static', express.static('public'))

app.get('/', (req, res) => res.send('response get ...'));
app.post('/', (req, res) => res.send('response post ...'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))