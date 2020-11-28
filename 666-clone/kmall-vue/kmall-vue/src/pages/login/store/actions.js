/*
* @Author: TomChen
* @Date:   2019-09-03 19:18:29
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-31 18:00:00
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作

import api from 'api'

import {LOGIN} from './types.js'
export default {
    async [LOGIN]({commit},{payload}){
        const result = await api.login(payload)
        return result
    },                                
}