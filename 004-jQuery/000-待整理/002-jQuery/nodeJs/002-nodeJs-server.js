/*
* @Author: Administrator
* @Date:   2020-06-28 10:43:16
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-28 10:57:09
*/
const http = require('http')

// const hostname = '127.0.0.1';
const hostname = 'localhost';
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World !\n')
})

server.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}/`)
})