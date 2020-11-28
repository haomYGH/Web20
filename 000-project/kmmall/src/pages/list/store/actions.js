import * as types from './types.js'
import api from '@api'

//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [types.GET_LIST]({commit},keyword){
        const data = await api.getListContent({
            keyword:keyword,
            channel:'wap'
        });
		commit(types.GET_LIST,data)
    },
}