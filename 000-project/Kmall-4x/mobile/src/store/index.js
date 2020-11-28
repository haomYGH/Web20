import Vue from 'vue'
import Vuex from 'vuex' //状态管理工具

Vue.use(Vuex)

import home from '@pages/home/store'


export default new Vuex.Store({
    modules:{
        home:home
    }
})