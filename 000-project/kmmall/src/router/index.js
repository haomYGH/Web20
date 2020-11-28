//1.引入模块
import Vue from "vue"
import VueRouter from "vue-router"

//2.引入页面组件
import home from '@pages/home'
import category from '@pages/category'
import cart from '@pages/cart'
import orderConfirm from '@pages/orderConfirm'
import saveAddress from '@pages/orderConfirm/children/saveAddress'
import me from '@pages/me'
import userCenter from '@pages/me/children/userCenter'
import search from '@pages/search'
import list from '@pages/list'
import detail from '@pages/detail'
import login from '@pages/login'
//测试页面
// import addCart from '@components/addCart'

//3.注册使用
Vue.use(VueRouter)


//4.导出路由对象
export default new VueRouter({
	routes:[
		{path:"/home",component:home},
		{path:"/category",component:category},
		{path:"/cart",component:cart},
		{
			path:"/orderConfirm",component:orderConfirm,
			children:[//子路由的组件必定在上一级路由中的 router-view 中显示，可以通过条件判断，将父组件的内容隐藏，或者导向新的页面
                {
					path: 'saveAddress', component: saveAddress
                }
			]
		},
		{
			path:"/me",component:me,
			children:[//子路由的组件必定在上一级路由中的 router-view 中显示，可以通过条件判断，将父组件的内容隐藏，或者导向新的页面
                {
					path: 'userCenter', component: userCenter
                }
			]
		},
		{path:"/search",component:search},
		{path:"/list",component:list},
		{path:"/detail/:id",component:detail},
		{path:"/login/",component:login},
		{path:"/",redirect:"/home"},
		//测试页面
		// {path:"/addCart",component:addCart},
	]
})