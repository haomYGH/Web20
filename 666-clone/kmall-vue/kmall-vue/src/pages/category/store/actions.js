/*
* @Author: TomChen
* @Date:   2019-09-03 19:18:29
* @Last Modified by:   Tom
* @Last Modified time: 2020-01-29 20:29:39
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作

import api from 'api'

import {GET_CHILD_CATEGORIES,GET_CATEGORIES} from './types.js'
export default {
    async [GET_CATEGORIES]({commit}){
        const result = await api.getArrayCategories({
            limit:20
        })
        if(result.code == 0){
            commit(GET_CATEGORIES,{categories:result.data})
        }
    },
    async [GET_CHILD_CATEGORIES]({commit},{payload}){
        const result = await api.getChildArrayCategories(payload)
        if(result.code == 0){
            commit(GET_CHILD_CATEGORIES,{categories:result.data})
        }
    },                                
}