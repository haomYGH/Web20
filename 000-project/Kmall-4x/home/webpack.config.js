const path = require('path');//配置入口entry和出口output:{}
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成dist/html文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//自动清理输出dist(因为用了随机的hash来做文件名,不能自动覆盖了)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css单独打包成一个文件

//自定义生成html文件 函数
const getHtmlConfig = (name,title)=>({
    template:'./src/view/'+name+'.html',//模板文件
    filename:name+'.html',//输出的文件名
    title:title,//页面标题
    // inject:'head',//脚本写在哪个标签里,默认是true(在html中的footer位置)
    hash:true,//给生成的js/css文件添加一个唯一的hash
    chunks:['common',name]
})
module.exports = {
    //指定打包环境
    mode: "development", // "production" | "development" 
    //入口
    entry:{
        'common': './src/pages/common/index.js',
        'footer': './src/pages/common/footer/index.js',
        'nav': './src/pages/common/nav/index.js',
        'logo': './src/pages/common/logo/index.js',
        'search': './src/pages/common/search/index.js',
        'index': './src/pages/index/index.js',
        'user-login': './src/pages/user-login/index.js',
        'user-register': './src/pages/user-register/index.js',
        'result': './src/pages/result/index.js',
        // 'list': './src/pages/list/index.js',
        'user-center': './src/pages/user-center/index.js',
        'user-update-password': './src/pages/user-update-password/index.js',
    },
    //输出
    output: {
        filename: 'js/[name].[hash].bundle.js',
        //静态资源路径配置
        publicPath:'/',//需要先npm install --save-dev webpack-dev-server
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',//清除警告
    //配置别名,在页面js文件里用的路径地址名
    resolve:{
        alias:{
            '@node_modules':path.resolve(__dirname,'./node_modules'),
            '@pages':path.resolve(__dirname,'./src/pages'),
            '@util':path.resolve(__dirname,'./src/util'),
            '@service':path.resolve(__dirname,'./src/service'),
        }
    },	
    //loader
    module: {
        rules: [
            //处理css文件
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
            //处理图片，字体
            {
				test: /\.(png|jpg|gif|jpeg|ttf|woff2|woff|eot|svg)\??.*$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    		options: {
			      			limit: 100,//文件小于100b的时候，不发送请求，直接以base64的格式显示到前台
			      			name:'resource/[name].[ext]'
			    		}
			  		}
				]
            },
            //处理 .tpl 文件
            {
	            test: /\.tpl$/,
	            use: {
			        loader: 'html-loader',
			    }
	        },
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('result','结果提示页面')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
	    	filename:'css/[name].css'
	    })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),//绝对路径，也可以使用相对路径./dist
        port:3002,
        proxy: [{//代理服务器,以下开头的请求从3000端口发出(并向3000端口请求)
            context: ['/sessions','/users'],//必须是以这开头，不能使用端口地址
            target: 'http://127.0.0.1:3000',
        }]	
    },
  };