/*
* @Author: Chen
* @Date:   2020-08-27 09:11:56
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-28 16:33:16
*/
//唯一更改state的方法
//mutation必须是同步函数
import { GET_ADS,GET_FLOORS } from './types.js'
export default {
	[GET_ADS](state,payload){
		state.homeAds = payload
	},
	[GET_FLOORS](state,payload){
		state.homeFloors = payload
	},
}