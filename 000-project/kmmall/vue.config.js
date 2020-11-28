const path = require('path')

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/less/mobile.less')
            ]
        }
    },
    chainWebpack:config =>{
        config.resolve.alias
        .set('@node_modules',path.resolve(__dirname,'./node_modules'))
        .set('@api',path.resolve(__dirname,'./src/api'))
        .set('@pages',path.resolve(__dirname,'./src/pages'))
        .set('@components',path.resolve(__dirname,'./src/components'))
        .set('@util',path.resolve(__dirname,'./src/util'))
        .set('@service',path.resolve(__dirname,'./src/service'))
    },
    devServer: {
        /*
        proxy: {
            // 所有以/ads开头的都代理到目标地址，劫持
            '/ads': {
                target: 'https://api.mall.kuazhu.com',
                changeOrigin: true
            },
            '/categories': {
                target: 'https://api.mall.kuazhu.com',
                changeOrigin: true
            },
            '/floors': {
                target: 'https://api.mall.kuazhu.com',
                changeOrigin: true
            },
            '/products': {//比较特殊
                target: 'https://api.mall.kuazhu.com',
                changeOrigin: true
            },
            '/detail': {//比较特殊
                target: 'https://api.mall.kuazhu.com',
                changeOrigin: true
            },
            '/users': {
                target: 'https://api.mall.kuazhu.com',
                changeOrigin: true
            },
        }
        */
       proxy: 'https://api.mall.kuazhu.com'
      } 
}