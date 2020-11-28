/*
* @Author: Chen
* @Date:   2020-08-25 09:21:01
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-28 17:03:36
*/
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

//加载全局CSS样式
import './assets/css/common.css'
//全局加载vant组件
import './plugins/vant/index.js'
//注册全局过滤器
import filters from './filters/index.js';
Object.keys(filters).forEach(key=>{Vue.filter(key,filters[key])})

import store from './store/index.js'

//引入路由
import router from './router/index.js'

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')


