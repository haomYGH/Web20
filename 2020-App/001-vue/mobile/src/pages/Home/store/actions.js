import {
    GET_CAROUSEL_IMG,
} from './types.js'
import { getHomeAds } from '@api'

//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [GET_CAROUSEL_IMG]({commit}){
        const data = await getHomeAds()
		commit(GET_CAROUSEL_IMG,data)
	}
}