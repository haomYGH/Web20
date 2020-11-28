/*
* @Author: Chen
* @Date:   2020-08-27 09:14:36
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-28 11:28:48
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import home from 'pages/home/store/index.js'

export default new Vuex.Store({
	modules:{
        home:home
    }
})