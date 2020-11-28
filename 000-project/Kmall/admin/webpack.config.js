/*
* @Author: Chen
* @Date:   2020-07-23 10:50:48
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-06 16:42:02
*/
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	//配置项目环境
	mode: "development", // "production" | "development" | "none"
	// 这里应用程序开始执行
 	// 指定入口文件
 	//单一入口写法:entry:"./src/index.js"
 	//多入口写法:
	entry: {
		index:'./src/index.js',
	},
	//指定出口文件
	output: {
	    filename: '[name]-[hash]-bundle.js',
	    path: path.resolve(__dirname, 'dist'),
	    //静态资源路径配置
	    publicPath:'/'
	},
	//配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            common:path.resolve(__dirname,'./src/common'),
            api:path.resolve(__dirname,'./src/api'),
            node_modules:path.resolve(__dirname,'./node_modules'),
        }
    },
	module: {
     	rules: [
     	//配置加载CSS文件
     		/*
       		{
         		test: /\.css$/,
 				use: [
           			'style-loader',
           			'css-loader'
         		]
       		},
       		*/
       		{
	            test: /\.css$/,
	            use: [
	              {
	                loader: MiniCssExtractPlugin.loader,
	                options: {
	                }
	              },
	              "css-loader"
	            ]
	        },
       	//配置加载图片资源
       		{
				test: /\.(png|jpg|gif)$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    			options: {
			      			limit: 10
			    		}
			  		}
				]
			},
		// 配置react(babel)
			{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			            // presets: ['env', 'react'],
			            presets: ['env','es2015','react','stage-3'],
			            //antd实现css按需加载
			            plugins: [
				            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }] 
				        ]
			        }
			    }               
			},
		//自定义主题
			{
			    test: /\.less$/,
			    use: [{
			      loader: 'style-loader',
			    }, {
			      loader: 'css-loader', // translates CSS into CommonJS
			    }, {
			      	loader: 'less-loader', // compiles Less to CSS
					options: {
					lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
							modifyVars: {
							   'primary-color': '#1DA57A',
							   'link-color': '#1DA57A',
							   'border-radius-base': '2px',
							 },
					 		javascriptEnabled: true,
						},
					},
			    }],
			}
     	]
   	},
   	plugins:[
   		//自动生成HTML
	    new htmlWebpackPlugin({
	        template:'./src/index.html',//模板文件
	        filename:'index.html',//输出的文件名
	        // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
	        hash:true,//给生成的js/css文件添加一个唯一的hash
	        chunks:['index']
	    }),
	    //自动清理dist目录
	    new CleanWebpackPlugin(),
	    //单独打包CSS文件资源
	    new MiniCssExtractPlugin({})
	],
	devServer:{
	    contentBase: './dist',//内容的目录
	    port:3001,//服务运行的端口
	    historyApiFallback:true,//h5路由刷新页面不向后台请求数据
	}
}