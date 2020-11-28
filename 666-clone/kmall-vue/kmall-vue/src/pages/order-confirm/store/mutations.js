/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:12
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-05 16:21:08
*/
//唯一更改state的方法
//mutation必须是同步函数
import {GET_SHIPPINGS,GET_SHIPPINGS_DETAIL,GET_ORDERS_PRODUCTS} from './types.js'
export default {
    [GET_SHIPPINGS](state,payload){
        state.shippings = payload.shippings      
    },
    [GET_SHIPPINGS_DETAIL](state,payload){
        state.shipping = payload.shipping      
    },
    [GET_ORDERS_PRODUCTS](state,payload){
        state.ordersProducts = payload
    },                                      
}