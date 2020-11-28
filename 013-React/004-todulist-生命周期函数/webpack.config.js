const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	mode:'development',
	// entry: './src/index.js',//单入口
	//多入口
	entry: {
		index:'./src/index.js'
	},
	output: {
		// filename: 'bundle.js',//单出口
		//多出口
		filename: '[name][hash].js',//其中[name]就是入口属性名(chunk名称)
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			//处理css
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			//处理图片 
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
			  		{
			    		loader: 'url-loader',//配置limit需要安装file-loader
						options: {//配置参数
							// limit代表图片最大的大小,图片小于limit时，在加载该图片时会将图片编译为base64形式的字符串,Ji
							// 超过limit的图片会被压缩到dist文件夹中
							//单位为B
			      			limit: 10
			    		}
			  		}
				]
			},
			//处理React代码
			{
				test:/\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']//react 转码规则
					}
				}               
			}						
		]
		   
	},
	//使用插件
	plugins:[
		//自动生成html
		new htmlWebpackPlugin({
			template:'./src/index.html',//模板文件
			filename:'index.html',//输出的文件名
			// inject:'head',//脚本写在那个标签里。默认是true(在body结束后)
			hash:true,//给生成的js/css文件添加一个唯一的hash
			chunks:['index'],//给输出文件引入具体的文件。默认引入所有
		}),
		//自动清理输出文件夹(dist)
		new CleanWebpackPlugin()
	],
	//服务器端启动
	devServer:{
		contentBase: './dist',//内容的目录
		port:8080//服务运行的端口
	}	
};