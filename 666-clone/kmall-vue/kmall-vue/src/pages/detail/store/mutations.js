/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:12
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-08 18:09:02
*/
//唯一更改state的方法
//mutation必须是同步函数
import {GET_PRODUCTS} from './types.js'
export default {
    [GET_PRODUCTS](state,payload){
        state.product = payload 
    },                                
}