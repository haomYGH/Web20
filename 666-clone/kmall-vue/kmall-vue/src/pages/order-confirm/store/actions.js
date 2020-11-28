/*
* @Author: TomChen
* @Date:   2019-09-03 19:18:29
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-05 16:20:24
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作

import api from 'api'

import {
    GET_SHIPPINGS,
    ADD_SHIPPINGS,
    DELETE_SHIPPINGS,
    GET_SHIPPINGS_DETAIL,
    UPDATE_SHIPPINGS,
    GET_ORDERS_PRODUCTS
} from './types.js'
export default {

    async [GET_SHIPPINGS]({commit}){
        const result = await api.getShippingsList()
        if(result.code == 0){
            commit(GET_SHIPPINGS,{shippings:result.data})
        }
    },
    async [ADD_SHIPPINGS]({commit,dispatch},{payload}){
        const result = await api.addShippings(payload)
        if(result.code == 0){
            commit(GET_SHIPPINGS,{shippings:result.data})
        }
    },
    async [GET_SHIPPINGS_DETAIL]({commit,dispatch},{payload}){
        const result = await api.getShippingsDetail(payload)
        if(result.code == 0){
            commit(GET_SHIPPINGS_DETAIL,{shipping:result.data})
        }
    },
    async [UPDATE_SHIPPINGS]({commit,dispatch},{payload}){
        const result = await api.updateShippings(payload)
        if(result.code == 0){
            commit(GET_SHIPPINGS,{shippings:result.data})
        }
    },
    async [DELETE_SHIPPINGS]({commit,dispatch},{payload}){
        const result = await api.deleteShippings(payload)
        if(result.code == 0){
            commit(GET_SHIPPINGS,{shippings:result.data})
        }
    },
    async [GET_ORDERS_PRODUCTS]({commit},){
        const result = await api.getOrdersProducts()
        if(result.code == 0){
            commit(GET_ORDERS_PRODUCTS,result.data)
        }
    },                                                             
}