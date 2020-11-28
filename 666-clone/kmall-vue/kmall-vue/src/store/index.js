/*
* @Author: TomChen
* @Date:   2019-09-03 19:20:44
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-11 10:55:20
*/
//store的出口文件
import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'
import category from 'pages/category/store'
import login from 'pages/login/store'
import tabBar from 'components/tab-bar/store'
import cart from 'pages/cart/store'
import detail from 'pages/detail/store'
import list from 'pages/list/store'
import orderConfirm from 'pages/order-confirm/store'
import me from 'pages/me/store'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home:home,
        category:category,
        login:login,
        tabBar:tabBar,
        cart:cart,
        orderConfirm:orderConfirm,
        me:me,
        detail:detail,
        list:list,
    }
})
