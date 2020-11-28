/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:12
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-08 15:37:09
*/
//唯一更改state的方法
//mutation必须是同步函数
import {GET_CARTS,CLEAN_CARTS} from './types.js'
export default {
    [GET_CARTS](state,payload){
        state.carts = payload.carts      
    },
    [CLEAN_CARTS](state){
        state.carts = {}
    },                                 
}