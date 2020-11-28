/*
* @Author: TomChen
* @Date:   2019-09-03 19:18:29
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-04 16:45:24
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作

import api from 'api'

import {GET_ADS,GET_FLOORS,GET_CATEGORIES} from './types.js'
export default {
    async [GET_ADS]({commit}){
        const result = await api.getPositionAds({
            position:2
        })
        if(result.code == 0){
            commit(GET_ADS,{ads:result.data})
        }
    },
    async [GET_FLOORS]({commit}){
        const result = await api.getFloors({
            limit:10
        })
        if(result.code == 0){
            commit(GET_FLOORS,{floors:result.data})
        }
    },
    async [GET_CATEGORIES]({commit}){
        const result = await api.getArrayCategories({
            limit:10
        })
        if(result.code == 0){
            commit(GET_CATEGORIES,{categories:result.data})
        }
    },                            
}