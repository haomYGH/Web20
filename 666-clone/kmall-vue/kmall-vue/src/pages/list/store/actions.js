/*
* @Author: TomChen
* @Date:   2019-09-03 19:18:29
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-10 09:53:36
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作

import api from 'api'

import {GET_PRODUCTS} from './types.js'
export default {
    async [GET_PRODUCTS]({commit},{payload}){
    	// console.log(payload)
        const result = await api.getProductsList(payload)
        if(result.code == 0){
            commit(GET_PRODUCTS,result.data)
        }
    },                                
}