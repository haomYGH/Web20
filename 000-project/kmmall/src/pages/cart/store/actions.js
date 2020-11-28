import * as types from './types.js'
import api from '@api'
//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [types.GET_CARTS_DATA]({commit}){
        const data = await api.getCartsData()
		commit(types.GET_CARTS_DATA,data)
    },
    async [types.SET_ITEM_CHECKED]({commit},payload){
        const data = await api.choices({
            checked:payload.checked,
            productId:payload.productId
        })
		commit(types.SET_ITEM_CHECKED,data)
    },
    async [types.SET_ITEM_COUNT]({commit},payload){
        const data = await api.counts({
            count:payload.count,
            productId:payload.productId
        })
		commit(types.SET_ITEM_COUNT,data)
    },
    async [types.SET_CHOICES]({commit},choices){
        const data = await api.choices({
            checked:choices
        })
		commit(types.SET_CHOICES,data)
    },
    async [types.DELETE_CHOICES]({commit}){
        const data = await api.carts()
		commit(types.DELETE_CHOICES,data)
    },
}