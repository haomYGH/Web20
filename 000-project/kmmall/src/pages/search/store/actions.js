import * as types from './types.js'
import { 
    getCategorySide,
    getCategoryContent
 } from '@service'

//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [types.GET_CATEGORY_SIDE]({commit}){
        const data = await getCategorySide()
		commit(types.GET_CATEGORY_SIDE,data)
    },
    async [types.GET_INIT_CONTENT]({commit},initCategoryId){
        const data = await getCategoryContent(initCategoryId)
		commit(types.GET_INIT_CONTENT,data)
    },
    async [types.GET_CATEGORY_CONTENT]({commit},pid){
        const data = await getCategoryContent(pid)
		commit(types.GET_CATEGORY_CONTENT,data)
    },
}