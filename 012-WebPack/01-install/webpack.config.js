const path = require('path');

module.exports = {
	mode:'development',
	// entry: './src/index.js',//单入口
	//多入口
	entry: {
		index:'./src/index.js',
		about:'./src/about.js'
	},
	output: {
		// filename: 'bundle.js',//单出口
		//多出口
		filename: '[name].js',//其中[name]就是入口属性名(chunk名称)
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
			}			
		]
		   
	}  
};