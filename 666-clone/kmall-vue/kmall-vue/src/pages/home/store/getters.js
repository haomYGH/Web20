/*
* @Author: TomChen
* @Date:   2019-09-03 19:20:11
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-29 17:04:10
*/
//store 的计算属性
//所有的组件都挂载到this.$store.getters上,所以命名不能冲突
export default {
    homeAds(state){
        //state代表当前模型中的state
        return state.ads
    },
    homeFloors(state){
        return state.floors
    },
    homeCategories(state){
        return state.categories
    }    
}