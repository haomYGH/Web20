/*
* @Author: TomChen
* @Date:   2019-09-03 19:18:29
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-26 10:01:40
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作

import api from 'api'

import {
    GET_CARTS,
    ADD_CARTS,
    UPDATE_CARTS_CHOICES,
    UPDATE_CARTS_COUNTS,
    DELETE_CARTS
} from './types.js'

export default {

    async [GET_CARTS]({commit}){
        const result = await api.getCarts()
        if(result.code == 0){
            commit(GET_CARTS,{carts:result.data})
        }
    },  
    async [ADD_CARTS]({commit,dispatch},{payload}){
        const result = await api.addCarts(payload)
        if(result.code == 0){
            dispatch(GET_CARTS)
        }
    },
    async [UPDATE_CARTS_CHOICES]({commit,dispatch},{payload}){
        const result = await api.updateCartsChoices(payload)
        if(result.code == 0){
            commit(GET_CARTS,{carts:result.data})
        }
    },
    async [UPDATE_CARTS_COUNTS]({commit,dispatch},{payload}){
        const result = await api.updateCartsCounts(payload)
        if(result.code == 0){
            commit(GET_CARTS,{carts:result.data})
        }
    },
    async [DELETE_CARTS]({commit}){
        const result = await api.deleteCarts()
        if(result.code == 0){
            commit(GET_CARTS,{carts:result.data})
        }
    },                                             
}