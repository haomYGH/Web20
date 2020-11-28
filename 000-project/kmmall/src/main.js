import Vue from 'vue'  //核心环境
import App from './App.vue'  //最外层组件
//全局使用
import './assets/css/common.css' //样式格式化
import './plugins/vant'  //使用插件

Vue.config.productionTip = false  //清除控制台无用警告
//配置项
import store from './store' //引入vuex的状态仓库
import router from './router'  //路由加载组件

//注册全局过滤器
import filters from './filters/index.js';//1)
Object.keys(filters).forEach(key=>{Vue.filter(key,filters[key])});//2)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
