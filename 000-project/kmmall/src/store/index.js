import Vue from 'vue'
import Vuex from 'vuex' //状态管理工具

Vue.use(Vuex)

import home from '@pages/home/store'
import category from '@pages/category/store'
import list from '@pages/list/store'
import detail from '@pages/detail/store'
import cart from '@pages/cart/store'
import orderConfirm from '@pages/orderConfirm/store'
import saveAddress from '@pages/orderConfirm/children/saveAddress/store'


export default new Vuex.Store({
    modules:{
        home:home,
        category:category,
        list:list,
        detail:detail,
        cart:cart,
        orderConfirm:orderConfirm,
        saveAddress:saveAddress,
    }
})