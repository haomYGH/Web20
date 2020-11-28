import * as types from './types.js'
import api from '@api'
//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [types.SAVE_ADDRESS]({commit},payload){
        payload = {
            address: payload.addressDetail,
            areaCode: payload.areaCode,
            city: payload.city,
            county: payload.country,
            name: payload.name,
            phone: payload.tel,
            province: payload.province,
            zip: payload.postalCode,
        }
        const data = await api.saveAddress(payload)
		commit(types.SAVE_ADDRESS,data)
    },
}