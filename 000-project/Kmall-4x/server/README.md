

> 服务器启动说明:
    /*安装依赖*/
    npm install
    /* 启动 */
        /* 启动数据库服务 */
            先创建db目录作为数据库mkdir db
            mongod --dbpath .\db\
        /* 启动端口服务器 */
            node .\app.js
    /* 添加管理员账户 */
        释放routes/users.js文件里面的//管理员注册，重启服务器，然后地址栏输入对应地址即可注册成功
    /* 添加用户同上,在用户注册接口 */

    /* 上传图片 */
        需要手动创建一个product-images文件夹，在静态资源public目录下
    
    