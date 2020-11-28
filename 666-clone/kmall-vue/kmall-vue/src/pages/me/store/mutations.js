/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:12
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-15 10:36:43
*/
//唯一更改state的方法
//mutation必须是同步函数
import {GET_USERINFO,GET_ORDERS_LIST,GET_ORDERS_DETAIL} from './types.js'
export default {
    [GET_USERINFO](state,payload){
        state.userInfo = payload
    },
    [GET_ORDERS_LIST](state,payload){
        state.orders = payload
    },
    [GET_ORDERS_DETAIL](state,payload){
        state.order = payload
    },                                     
}