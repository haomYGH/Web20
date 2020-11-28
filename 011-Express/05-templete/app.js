/*
* @Author: Administrator
* @Date:   2020-07-13 09:27:14
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-13 17:04:12
*/
const express = require('express')
const app = express()
const port = 3000;

const swig = require('swig');

//swig模板
//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
})
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html')
app.get('/',(req,res)=>{
    //第一个参数是相对于模板目录的文件(.html后缀名可省略)
    //第二个参数是传递给模板的数据
    res.render('index',{
        title:'跨猪网',
        name:'Alice',
        age:'18',
        friends:['Haom','Tom']
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))