/*
* @Author: TomChen
* @Date:   2019-09-03 19:20:11
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-04 15:28:34
*/
//store 的计算属性
//所有的组件都挂载到this.$store.getters上,所以命名不能冲突
export default {
    carts(state){
        //state代表当前模型中的state
        return state.carts
    },
    //购物车的数量
    cartCount(state){
        if(state.carts){
            if(state.carts.cartList){
                return state.carts.cartList.length
            }else{
                return 0
            }
        }else{
            return 0
        }
    } 
}