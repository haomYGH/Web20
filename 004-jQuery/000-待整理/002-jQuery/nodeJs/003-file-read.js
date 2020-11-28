/*
* @Author: Administrator
* @Date:   2020-06-28 10:48:36
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-28 11:08:59
*/
const fs = require('fs')
// 使用相对路径
const path = require('path')

fs.readFile(path.join(__dirname,"./001-nodeJs-读取文件请求流程.html"), 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})