const path = require('path')

module.exports = {
    devServer: {
        port: 3003,
        proxy: 'http://127.0.0.1:3000'
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/less/index.less')
            ]
        }
    },
    chainWebpack:config =>{
        config.resolve.alias
        .set('@node_modules',path.resolve(__dirname,'./node_modules'))
        .set('@api',path.resolve(__dirname,'./src/api'))
        .set('@pages',path.resolve(__dirname,'./src/pages'))
        .set('@api',path.resolve(__dirname,'./src/api'))
        .set('@components',path.resolve(__dirname,'./src/components'))
    } 
}