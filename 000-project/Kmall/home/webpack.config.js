/*
* @Author: Chen
* @Date:   2020-07-23 10:50:48
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 15:47:50
*/
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getHtmlConfig = (name,title)=>({
    template:'./src/views/'+name+'.html',//模板文件
    filename:name+'.html',//输出的文件名
    title:title,
    // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
    hash:true,//给生成的js/css文件添加一个唯一的hash
    chunks:['common',name]
})


module.exports = {
	//配置项目环境
	mode: "development", // "production" | "development" | "none"
	// 这里应用程序开始执行
 	// 指定入口文件
 	//多入口写法:
	entry: {
		'common': 				'./src/pages/common/index.js',
		'index': 				'./src/pages/index/index.js',
		'user-login': 			'./src/pages/user-login/index.js',
		'list': 				'./src/pages/list/index.js',
		'user-register': 		'./src/pages/user-register/index.js',
		'result': 				'./src/pages/result/index.js',
		'user-center': 			'./src/pages/user-center/index.js',
		'user-update-password': './src/pages/user-update-password/index.js',
		'detail': 				'./src/pages/detail/index.js',
		'cart': 				'./src/pages/cart/index.js',
		'order-confirm': 		'./src/pages/order-confirm/index.js',
		'payment': 				'./src/pages/payment/index.js',
		'order-list': 			'./src/pages/order-list/index.js',
		'order-detail': 		'./src/pages/order-detail/index.js',
	},
	//指定出口文件
	output: {
	    filename: 'js/[name]-[hash]-bundle.js',
	    path: path.resolve(__dirname, 'dist'),
	    //静态资源路径配置
	    publicPath:'/'
	},
	//配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            node_modules:path.resolve(__dirname,'./node_modules'),
            util:path.resolve(__dirname,'./src/util'),
            api:path.resolve(__dirname,'./src/api'),
        }
    },
	module: {
     	rules: [
     	//配置加载CSS文件
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
				test: /\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    		options: {
			      			limit: 10,
			      			name: 'resource/[name].[ext]'
			    		}
			  		}
				]
			},
		// 配置babel
			{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			            // presets: ['env', 'react'],
			            presets: ['env','es2015','stage-3'],
			        }
			    }               
			},
		//配置tpl
			{
	            test: /\.tpl$/,
	            use: {
			        loader: 'html-loader',
			    }
	        },
     	]
   	},
   	plugins:[
   		//自动生成HTML
	    new htmlWebpackPlugin(getHtmlConfig('index','首页')),
	    new htmlWebpackPlugin(getHtmlConfig('user-login','登录页')),
	    new htmlWebpackPlugin(getHtmlConfig('list','列表页')),
	    new htmlWebpackPlugin(getHtmlConfig('user-register','注册页面')),
	    new htmlWebpackPlugin(getHtmlConfig('result','提示页面')),
	    new htmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
	    new htmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),
	    new htmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
	    new htmlWebpackPlugin(getHtmlConfig('cart','购物车')),
	    new htmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页面')),
	    new htmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
	    new htmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
	    new htmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
	    //自动清理dist目录
	    new CleanWebpackPlugin(),
	    //单独打包CSS文件资源
	    new MiniCssExtractPlugin({
	    	filename:'css/[name]-[hash]-bundle.css'
	    })
	],
	devServer:{
	    contentBase: './dist',//内容的目录
	    port:3002,//服务运行的端口
	    proxy: [{
		  	context: [
		  		"/sessions",
		  		"/users",
		  		"/categories",
		  		"/ads",
		  		"/floors",
		  		"/products",
		  		"/carts",
		  		"/orders",
		  		"/shippings",
		  		"/payments",
		  	],
		  	//请求地址是以context内部的值开头的路由全部代理到target提供的地址下
		  	target: "http://127.0.0.1:3000",
		}]
	}
}