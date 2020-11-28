import * as types from './types.js'
import api from '@api'
//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [types.GET_SHIPPINGS_LIST]({commit}){
        const data = await api.getShippingsList()
		commit(types.GET_SHIPPINGS_LIST,data)
    },
    async [types.GET_PRODUCTS_DATA]({commit}){
        const data = await api.getProductsData()
		commit(types.GET_PRODUCTS_DATA,data)
    },
}