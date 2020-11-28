/*
* @Author: TomChen
* @Date:   2019-09-03 19:18:29
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-08 17:09:21
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作

import api from 'api'

import {
    GET_USERINFO,
    GET_ORDERS_LIST,
    GET_ORDERS_DETAIL,
    UPDATE_ORDERS_STATUS,
    UPDATE_ORDERS_PAY
} from './types.js'

export default {

    async [GET_USERINFO]({commit}){
        const result = await api.getUserinfo()
        if(result.code == 0){
            commit(GET_USERINFO,result.data)
        }
    },
    async [GET_ORDERS_LIST]({commit},{payload}){
        const result = await api.getOrdersList(payload)
        if(result.code == 0){
            commit(GET_ORDERS_LIST,result.data)
        }
    },
    async [GET_ORDERS_DETAIL]({commit},{payload}){
        const result = await api.getOrdersDetail(payload)
        if(result.code == 0){
            commit(GET_ORDERS_DETAIL,result.data)
        }
    },
    async [UPDATE_ORDERS_STATUS]({commit},{payload}){
        const result = await api.updateOrdersStatus(payload)
        if(result.code == 0){
            commit(GET_ORDERS_DETAIL,result.data)
        }
    },                                                    
}