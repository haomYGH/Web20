/*
* @Author: TomChen
* @Date:   2019-09-04 18:12:27
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-11 10:36:49
*/
//1.引入模块
import Vue from "vue"
import VueRouter from "vue-router"

//2.引入页面组件
import Home from 'pages/home'
import Cart from 'pages/cart'
import Category from 'pages/category'

import Me from 'pages/me'
import OrderList from 'pages/me/children/order-list'
import OrderDetail from 'pages/me/children/order-detail'
import UserCenter from 'pages/me/children/user-center'

import Search from 'pages/search'
import List from 'pages/list'
import Detail from 'pages/detail'

import Login from 'pages/login'
import OrderConfirm from 'pages/order-confirm'
import SaveAddress from 'pages/order-confirm/children/save-address'

//3.声明使用
Vue.use(VueRouter)


//4.导出路由对象
export default new VueRouter({
    routes:[
        {path:"/home",component:Home,meta:{keepAlive:true}},//用meta属性传递参数
        {path:"/category",component:Category,meta:{keepAlive:true}},
        {path:"/cart",component:Cart},
        {
            path:"/me",
            component:Me,
            children:[
                {
                    path: 'userCenter',
                    component: UserCenter
                },
                {
                    path: 'orderList/:status?',
                    component: OrderList,
                    props: true
                },
                {
                    path: 'orderDetail/:orderNo?',
                    component: OrderDetail,
                    props: true
                }                                 
            ]
        },
        {path:"/login",component:Login},
        {path:"/search",component:Search},
        {path:"/list",component:List,props:(route)=>({keyword:route.query.keyword,categoryId:route.query.categoryId}) },
        {path:"/detail/:id",component:Detail,props: true},
        {
            path:"/orderConfirm",
            component:OrderConfirm,
            children:[
                {
                    path: 'saveAddress/:id?',
                    component: SaveAddress,
                    props: true
                }
            ]            
        },
        {path:"/",redirect:"/home"},
    ]
})
