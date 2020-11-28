/*
* @Author: Tom
* @Date:   2020-01-10 09:47:24
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-04 17:04:33
*/
const merge = require('webpack-merge');
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devServer: {
        port: 3003,
        proxy: {           
            '/':{
                // target: 'http://127.0.0.1:3000',
                target: 'https://api.mall.kuazhu.com',
                ws: false,
                changeOrigin: true               
            }
        }
    }, 
})