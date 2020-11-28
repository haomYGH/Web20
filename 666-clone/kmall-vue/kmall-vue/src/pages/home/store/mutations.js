/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:12
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-29 17:04:48
*/
//唯一更改state的方法
//mutation必须是同步函数
import {GET_ADS,GET_FLOORS,GET_CATEGORIES} from './types.js'
export default {
    [GET_ADS](state,payload){
        state.ads = payload.ads      
    },
    [GET_FLOORS](state,payload){
        state.floors = payload.floors      
    },
    [GET_CATEGORIES](state,payload){
        state.categories = payload.categories      
    }                             
}