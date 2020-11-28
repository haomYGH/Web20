/*
* @Author: TomChen
* @Date:   2019-09-03 19:20:11
* @Last Modified by:   Tom
* @Last Modified time: 2020-01-29 20:30:44
*/
//store 的计算属性
//所有的组件都挂载到this.$store.getters上,所以命名不能冲突
export default {
    categoryChildCategories(state){
        return state.child_categories
    },
    categoryCategories(state){
        return state.categories
    }    
}