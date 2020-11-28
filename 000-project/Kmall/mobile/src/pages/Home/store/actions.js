/*
* @Author: Chen
* @Date:   2020-08-27 09:11:56
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-28 16:38:43
*/
//组件中用由this.$store.dispatch方法来派发action
//action中用commit来提交mutation
//action中可以包含异步操作
import api from 'api';

import { GET_ADS,GET_FLOORS } from './types.js'
export default {
	async [GET_ADS]({commit}){
		var result = await api.getHomeAds()
		if(result.data.code == 0){
			commit(GET_ADS,result.data.data)
		}
	},
	async [GET_FLOORS]({commit}){
		var result = await api.getHomeFloors()
		if(result.data.code == 0){
			commit(GET_FLOORS,result.data.data)
		}
	},
}