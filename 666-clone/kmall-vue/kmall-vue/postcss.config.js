module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-pxtorem': {
            rootValue: 32, //结果为：设计稿元素尺寸/32，比如元素宽320px,最终页面会换算成 10rem
            propList: ['*']
        }        
    },
}