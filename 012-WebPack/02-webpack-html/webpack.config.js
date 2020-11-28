const path = require('path');//配置入口entry和出口output:{}
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成dist/html文件

module.exports = {
    //指定打包环境
    mode: "development", // "production" | "development" 
    //入口
    entry:{
       index: './src/index.js',
    },
    //出口
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    //管理资源
    module: {
        rules: [
            {
                test: /\.css$/,//加载 CSS
                use: [
                'style-loader',
                'css-loader'
                ]
            }
        ]
    },
    //管理输出
    plugins: [
        new HtmlWebpackPlugin({//自动生成dist/html文件(自动引入输出文件)
            template:'./index.html',//模板文件
	        // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
	        hash:true,//给生成的js/css文件添加一个唯一的hash
	        chunks:['index']
        })
    ]
  };