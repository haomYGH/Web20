/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:12
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-01 19:46:28
*/
//唯一更改state的方法
//mutation必须是同步函数
import {SET_ACTIVE_INDEX} from './types.js'
export default {
    [SET_ACTIVE_INDEX](state,payload){
        sessionStorage.setItem('tabBarActiveIndex',payload)
        state.active = payload    
    }                            
}