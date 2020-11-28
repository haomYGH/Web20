<template>
    <div class="TabBar">
        <van-tabbar 
            v-model="active"
            active-color="#07c160"
            inactive-color="#000"
            @change="handleChage"
        >
            <van-tabbar-item     
            replace
            to="/home"
            icon="home-o">
                首页
            </van-tabbar-item>
            <van-tabbar-item     
            replace
            to="/category"
            icon="notes-o">
                分类
            </van-tabbar-item>
            <van-tabbar-item     
            replace
            to="/cart"
            :info="cartCount"
            icon="cart-o">
                购物车
            </van-tabbar-item>            
            <van-tabbar-item     
            replace
            to="/me"
            icon="friends-o">
                个人中心
            </van-tabbar-item>                         
        </van-tabbar>
    </div>
</template>

<script>
    import { mapMutations,mapGetters } from 'vuex'
    import {SET_ACTIVE_INDEX} from './store/types.js'
    export default {
        name:'TabBar',
        computed: {
            ...mapGetters([
                'cartCount'
            ]),
            active:{
                get(){
                   return this.$store.state.tabBar.active  
                },
                set(active){
                    this[SET_ACTIVE_INDEX](active)
                }
            }
        },         
        methods:{
            ...mapMutations([SET_ACTIVE_INDEX]),
            handleChage(active){
                //缓存用户点击的选项卡索引,当用户再次刷新时可以停留在当前选项
                this[SET_ACTIVE_INDEX](active)
            }
        },           
    }
</script>

<style>
  
</style>