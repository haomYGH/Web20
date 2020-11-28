import * as types from './types.js'
import api from '@api'

//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [types.GET_ADS]({commit}){
        const data = await api.getHomeAds()
		commit(types.GET_ADS,data)
    },
    async [types.GET_HOT_CATEGORIES]({commit}){
        const data = await api.getHotCategories()
		commit(types.GET_HOT_CATEGORIES,data)
    },
    async [types.GET_HOME_FLOORS]({commit}){
        const data = await api.getHomeFloors()
		commit(types.GET_HOME_FLOORS,data)
	}
}