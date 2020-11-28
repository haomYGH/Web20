/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:12
* @Last Modified by:   Tom
* @Last Modified time: 2020-01-29 20:30:17
*/
//唯一更改state的方法
//mutation必须是同步函数
import {GET_CHILD_CATEGORIES,GET_CATEGORIES} from './types.js'
export default {
    [GET_CATEGORIES](state,payload){
        state.categories = payload.categories      
    },
    [GET_CHILD_CATEGORIES](state,payload){
        state.child_categories = payload.categories      
    },                           
}