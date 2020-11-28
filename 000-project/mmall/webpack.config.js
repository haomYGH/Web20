const path = require('path');
const webpack           = require('webpack') //抽取公共模块要引入webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')//===

let WEBPACK_ENV= process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'), // webpack打包的文件最后会放在哪里
    publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//s.jianliwu.com/mmall/dist/' , // ===配置后打包后的文件路径前加/dist/
    filename: 'js/app.js' // =========分目录
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname, 'src/page'), // 配置一个绝对路径,__dirname表示在当前文件所在的目录下面他去找src/page目录
      component: path.resolve(__dirname, 'src/component'),
      util: path.resolve(__dirname, 'src/util'),
      service: path.resolve(__dirname, 'src/service'),
    }
  },
  module: {
    rules: [
      // react语法的处理
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'] // 配置react=========================
          }
        }
      },
      // css文件的处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 图片处理
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'// =========分目录
            },
          },
        ],
      },
      // 字体处理
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resourc/[name].[ext]'// =========分目录
            }
          }
        ],
      }
    ]
  },
  plugins: [
    // 处理html文件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 使用自定义模板
      favicon: 'favicon.ico'
    }),
    // 提取出独立的css文件
    new ExtractTextPlugin('css/[name].css'),
    // 提取公共的模块(webpack自带)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 公共模块,自己指定,没有就随意写一个
      filename: 'js/base.js', // 通用模块打包成一个js
    })
  ],
  devServer: {
    port: '8086',
    historyApiFallback: {
      // 解决：每次刷新都会跳转到服务器后台，每次必须通过localhost:8086/dist/index.html问题
      // 当404或者是其他页面都会访问到这里
      index: '/dist/index.html'
    },
    proxy: {
      // 所有以/manage开头的都代理到目标地址，劫持
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
    }
  }
};