//1.引入模块
import Vue from "vue"
import VueRouter from "vue-router"

//2.引入页面组件
import home from '@pages/home/home.vue'
import cart from '@pages/cart/cart.vue'
import me from '@pages/me/me.vue'

//3.声明使用
Vue.use(VueRouter)


//4.导出路由对象
export default new VueRouter({
	routes:[
		{path:"/home",component:home},
		{path:"/cart",component:cart},
		{path:"/me",component:me},
		{path:"/",redirect:"/home"},
	]
})